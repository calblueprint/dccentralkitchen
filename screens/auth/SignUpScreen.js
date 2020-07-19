import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions } from '@react-navigation/native';
import Constants from 'expo-constants';
import * as Analytics from 'expo-firebase-analytics';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Button, Keyboard } from 'react-native';
import * as Sentry from 'sentry-expo';
import AuthTextField from '../../components/AuthTextField';
import {
  BigTitle,
  Body,
  ButtonContainer,
  ButtonLabel,
  Caption,
  FilledButtonContainer,
  Subtitle,
} from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
import RecordIds from '../../constants/RecordIds';
import { newSignUpBonus } from '../../constants/Rewards';
import { env, firebaseConfig } from '../../environment';
import {
  createCustomers,
  createPushTokens,
  getCustomersByPhoneNumber,
  updateCustomers,
} from '../../lib/airtable/request';
import {
  encryptPassword,
  formatPhoneNumberInput,
  inputFields,
} from '../../lib/authUtils';
import {
  logAuthErrorToSentry,
  logErrorToSentry,
  setUserLog,
} from '../../lib/logUtils';
import {
  AuthScreenContainer,
  AuthScrollContainer,
  BackButton,
  FormContainer,
} from '../../styled/auth';
import { RowContainer } from '../../styled/shared';
import validate from './validation';
import VerificationScreen from './VerificationScreen';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    const recaptchaVerifier = React.createRef();
    this.state = {
      modalVisible: false,
      recaptchaVerifier,
      verificationId: null,
      values: {
        [inputFields.NAME]: '',
        [inputFields.PHONENUM]: '',
        [inputFields.PASSWORD]: '',
      },
      errors: {
        [inputFields.NAME]: '',
        [inputFields.PHONENUM]: '',
        [inputFields.PASSWORD]: '',
        submit: '',
      },
      token: '',
    };
  }

  // TODO @johnathanzhou or @anniero98
  // Notifications currently not functional - the `_handleNotification` function doesn't even exist.
  // Also unclear to devs what the flow should be with receiving notifications
  componentDidMount() {
    // this.registerForPushNotificationsAsync();
    // this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  // TODO should convert to functional component and use onFocusEffect
  _clearState = () => {
    this.setState({
      values: {
        [inputFields.NAME]: '',
        [inputFields.PHONENUM]: '',
        [inputFields.PASSWORD]: '',
        [inputFields.CODE]: '',
      },
      errors: {
        [inputFields.NAME]: '',
        [inputFields.PHONENUM]: '',
        [inputFields.PASSWORD]: '',
        [inputFields.CODE]: '',
      },
      token: '',
    });
  };

  // Purely to bypass signups for development -- developer is not required to sign up to enter home screen.
  // Configures to use David Ro's test account
  _devBypass = async () => {
    // Doesn't enforce any resolution for this async call
    await AsyncStorage.setItem('customerId', RecordIds.testCustomerId);
    this.props.navigation.navigate('App');
  };

  // Sign up function. It sets the user token in local storage
  // to be the customer's recordId and then navigates to the Map screen.
  _asyncSignUp = async (customerId) => {
    await AsyncStorage.setItem('customerId', customerId);
    Keyboard.dismiss();
    this.props.navigation.navigate('App');
  };

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        Alert.alert('Failed to get push token for push notification!');
        return;
      }
      const token = await Notifications.getExpoPushTokenAsync();
      this.setState({ token });
    } else {
      Alert.alert('Must use physical device for Push Notifications');
    }
  };

  // Add customer to Airtable, creating a push token record first.
  addCustomer = async () => {
    const { token, values } = this.state;
    const name = values[inputFields.NAME];
    const phoneNumber = values[inputFields.PHONENUM];
    const password = values[inputFields.PASSWORD];
    try {
      let pushTokenId = null;
      if (token) {
        pushTokenId = await createPushTokens({ token });
      }
      // Register a customer in two steps when encrypting passwords
      const customerId = await createCustomers({
        name,
        phoneNumber,
        // 2020/4/29 update for Nam's launch
        points: newSignUpBonus,
        pushTokenIds: pushTokenId ? [pushTokenId] : null,
      });

      // We use the record ID generated by Airtable as the salt to encrypt
      const encrypted = await encryptPassword(customerId, password);

      // Update the created record with the encrypted password
      await updateCustomers(customerId, { password: encrypted });

      // If signup succeeds, register the user for analytics and logging
      setUserLog({ id: customerId, name, phoneNumber });
      Analytics.logEvent('sign_up_complete', {
        customer_id: customerId,
      });
      Sentry.captureMessage('Sign Up Successful');
      return customerId;
    } catch (err) {
      console.error('[SignUpScreen] (addCustomer) Airtable:', err);
      logErrorToSentry({
        screen: 'SignUpScreen',
        action: 'addCustomer',
        error: err,
      });
    }
    return null;
  };

  // Handle form submission. Validate fields first, then check duplicates.
  // If there are no errors, add customer to Airtable.
  handleSubmit = async () => {
    try {
      // Check for duplicates first
      const duplicateCustomers = await getCustomersByPhoneNumber(
        this.state.values[inputFields.PHONENUM]
      );
      if (duplicateCustomers.length !== 0) {
        console.log('Duplicate customer');
        const errorMsg = 'Phone number already in use';
        if (
          duplicateCustomers.length === 1 &&
          !duplicateCustomers[0].password
        ) {
          Alert.alert(
            'Phone number registered without a password',
            `${
              this.state.values[inputFields.PHONENUM]
            } does not have a password yet. Set a password to finish setting up your account.`,
            [
              {
                text: 'Set a password',
                onPress: () =>
                  this.props.navigation.navigate('Reset', {
                    forgot: false,
                  }),
              },
              {
                text: 'Cancel',
                style: 'cancel',
              },
            ]
          );
        }
        logAuthErrorToSentry({
          screen: 'SignUpScreen',
          action: 'handleSubmit',
          attemptedPhone: this.state.values[inputFields.PHONENUM],
          attemptedPass: null,
          error: errorMsg,
        });
        this.setState((prevState) => ({
          errors: {
            ...prevState.errors,
            [inputFields.PHONENUM]: errorMsg,
          },
        }));
        return;
      }

      // Pops up a captcha for verification.
      this.openRecaptcha();
    } catch (err) {
      console.error('[SignUpScreen] (handleSubmit) Airtable:', err);
      logAuthErrorToSentry({
        screen: 'SignUpScreen',
        action: 'handleSubmit',
        attemptedPhone: null,
        attemptedPass: null,
        error: err,
      });
    }
    Keyboard.dismiss();
  };

  openRecaptcha = async () => {
    // const number = '+1'.concat(
    //   this.state.values[inputFields.PHONENUM].replace(/\D/g, '')
    // );
    const number = '+1'.concat(this.state.values[inputFields.PHONENUM]);
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    try {
      const verificationId = await phoneProvider.verifyPhoneNumber(
        number,
        // eslint-disable-next-line react/no-access-state-in-setstate
        this.state.recaptchaVerifier.current
      );
      this.setState({ verificationId });
      this.setModalVisible(true);
    } catch (err) {
      this.setState({
        errors: {
          submit: `Error: You must complete the verification pop-up. Make sure your phone number is valid and try again.`,
        },
      });
      this.setModalVisible(false);
      console.log(err);
      logErrorToSentry({
        screen: 'SignUpScreen',
        action: 'openRecaptcha',
        error: err,
      });
    }
  };

  verifyCode = async (code) => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        this.state.verificationId,
        code
      );
      await firebase.auth().signInWithCredential(credential);
      this.setModalVisible(false);
      this.completeSignUp();
      return true;
    } catch (err) {
      console.log(err);
      logErrorToSentry({
        screen: 'SignUpScreen',
        action: 'verifyCode',
        error: err,
      });
      return false;
    }
  };

  completeSignUp = async () => {
    const customerId = await this.addCustomer();
    this._clearState();
    await this._asyncSignUp(customerId);
  };

  // Check for an error with updated text
  // Set errors and updated text in state
  updateError = async (text, inputField) => {
    let error = false;
    let errorMsg = '';
    // validate returns null if no error is found
    switch (inputField) {
      case inputFields.PHONENUM:
        errorMsg = validate('phoneNumber', text);
        error = errorMsg !== null;
        break;
      case inputFields.PASSWORD:
        errorMsg = validate('password', text);
        error = errorMsg !== null;
        break;
      case inputFields.NAME:
        error = !text.replace(/\s/g, '').length;
        if (error) errorMsg = 'Name cannot be blank';
        break;
      default:
        console.log('Not reached');
    }

    this.setState((prevState) => ({
      errors: { ...prevState.errors, [inputField]: errorMsg, submit: '' },
      values: { ...prevState.values, [inputField]: text },
    }));

    return error;
  };

  // onBlur callback is required in case customer taps on field, does nothing, and taps out
  onBlur = async (inputField) => {
    await this.updateError(inputField);
  };

  // onTextChange does a check before updating errors
  // It can only remove errors, not trigger them
  onTextChange = async (text, inputField) => {
    // Only update error if there is currently an error
    // Unless field is password, since it is generally the last field to be filled out
    if (this.state.errors[inputField] || inputField === inputFields.PASSWORD) {
      await this.updateError(
        inputField === inputFields.PHONENUM
          ? formatPhoneNumberInput(text)
          : text,
        inputField
      );
    } else {
      this.setState((prevState) => ({
        values: {
          ...prevState.values,
          [inputField]:
            inputField === inputFields.PHONENUM
              ? formatPhoneNumberInput(text)
              : text,
        },
      }));
    }
  };

  render() {
    const { errors, values } = this.state;

    // Initially, button should be disabled
    // Until all fields have been (at least) filled out
    const fieldsFilled =
      values[inputFields.NAME] &&
      values[inputFields.PHONENUM] &&
      values[inputFields.PASSWORD];
    const noErrors =
      !errors[inputFields.NAME] &&
      !errors[inputFields.PHONENUM] &&
      !errors[inputFields.PASSWORD];

    const signUpPermission = fieldsFilled && noErrors;

    return (
      <AuthScreenContainer>
        <AuthScrollContainer
          ref={(ref) => {
            this.scrollView = ref;
          }}>
          {this.state.modalVisible && (
            <VerificationScreen
              number={values[inputFields.PHONENUM]}
              visible={this.state.modalVisible}
              verifyCode={this.verifyCode}
              resend={this.openRecaptcha}
              closer={this.setModalVisible}
            />
          )}

          <FirebaseRecaptchaVerifierModal
            ref={this.state.recaptchaVerifier}
            firebaseConfig={firebaseConfig}
          />
          <BackButton onPress={() => this.props.navigation.goBack()}>
            <FontAwesome5 name="arrow-left" solid size={24} />
          </BackButton>
          <BigTitle>Sign Up</BigTitle>
          <Subtitle style={{ marginTop: 32 }}>
            {'If you registered in person with your phone number, '}
            <Subtitle
              color={Colors.primaryGreen}
              onPress={() =>
                this.props.navigation.navigate('Reset', { forgot: false })
              }>
              click here to set a password
            </Subtitle>
            {' to finish setting up your account.'}
          </Subtitle>
          <FormContainer>
            <AuthTextField
              fieldType="Name"
              value={values[inputFields.NAME]}
              onBlurCallback={(value) => {
                this.updateError(value, inputFields.NAME);
                this.scrollView.scrollToEnd({ animated: true });
              }}
              changeTextCallback={async (text) =>
                this.onTextChange(text, inputFields.NAME)
              }
              error={errors[inputFields.NAME]}
            />

            <AuthTextField
              fieldType="Phone Number"
              value={values[inputFields.PHONENUM]}
              onBlurCallback={(value) => {
                this.updateError(value, inputFields.PHONENUM);
                this.scrollView.scrollToEnd({ animated: true });
              }}
              changeTextCallback={(text) =>
                this.onTextChange(text, inputFields.PHONENUM)
              }
              error={errors[inputFields.PHONENUM]}
            />

            <AuthTextField
              fieldType="Password"
              value={values[inputFields.PASSWORD]}
              onBlurCallback={(value) =>
                this.updateError(value, inputFields.PASSWORD)
              }
              changeTextCallback={(text) =>
                this.onTextChange(text, inputFields.PASSWORD)
              }
              error={errors[inputFields.PASSWORD]}
            />
            <Caption
              style={{ alignSelf: 'center', fontSize: 14 }}
              color={Colors.error}>
              {errors.submit}
            </Caption>
          </FormContainer>
          <FilledButtonContainer
            style={{ marginTop: 24, marginBottom: 12, alignSelf: 'flex-end' }}
            color={
              !signUpPermission ? Colors.lightestGreen : Colors.primaryGreen
            }
            width="100%"
            onPress={() => this.handleSubmit()}
            disabled={!signUpPermission}>
            <ButtonLabel color={Colors.lightText}>Continue</ButtonLabel>
          </FilledButtonContainer>

          <RowContainer
            style={{
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
            <Body>{`Already have an account? `}</Body>
            <ButtonContainer
              onPress={() =>
                this.props.navigation.dispatch(StackActions.replace('LogIn'))
              }>
              <ButtonLabel noCaps color={Colors.primaryGreen}>
                Log In
              </ButtonLabel>
            </ButtonContainer>
          </RowContainer>
          {env === 'dev' && (
            <Button
              title="Testing Bypass"
              onPress={async () => this._devBypass()}
            />
          )}
        </AuthScrollContainer>
      </AuthScreenContainer>
    );
  }
}

SignUpScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

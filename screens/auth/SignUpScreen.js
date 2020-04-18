/* eslint-disable */
import { FontAwesome5 } from '@expo/vector-icons';
import { Notifications } from 'expo';
import Constants from 'expo-constants';
import * as Analytics from 'expo-firebase-analytics';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';
import React from 'react';
import { AsyncStorage, Keyboard, Modal } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AuthTextField from '../../components/AuthTextField';
import {
  BigTitle,
  ButtonLabel,
  FilledButtonContainer,
} from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
import { firebaseConfig } from '../../firebase';
import {
  createCustomers,
  createPushTokens,
  getCustomersByPhoneNumber,
} from '../../lib/airtable/request';
import { formatPhoneNumber, signUpFields } from '../../lib/authUtils';
import {
  AuthScreenContainer,
  BackButton,
  FormContainer,
} from '../../styled/auth';
import validate from './validation';

firebase.initializeApp(firebaseConfig);

export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    const recaptchaVerifier = React.createRef();
    this.state = {
      modalVisible: false,
      ref: recaptchaVerifier,
      verificationId: null,
      verificationCode: null,
      recaptchaToken: null,
      values: {
        [signUpFields.NAME]: '',
        [signUpFields.PHONENUM]: '',
        [signUpFields.PASSWORD]: '',
        [signUpFields.CODE]: '',
      },
      errors: {
        [signUpFields.NAME]: '',
        [signUpFields.PHONENUM]: '',
        [signUpFields.PASSWORD]: '',
        [signUpFields.CODE]: '',
        // Duplicate phone number error - currently not being displayed
        submit: '',
      },
      token: '',
      processing: false,
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  // TODO @johnathanzhou or @anniero98
  // Notifications is jank - the `_handleNotification` function doesn't even exist. Unclear to devs what the flow should be with receiving notifications
  componentDidMount() {
    // this.registerForPushNotificationsAsync();
    // this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  openRecaptcha = async () => {
    const number = '+1'.concat(this.state.values[signUpFields.PHONENUM]);
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    const verificationId = await phoneProvider.verifyPhoneNumber(
      number,
      this.state.ref.current
    );
    this.setState({ verificationId });
    this.setModalVisible(true);
  };

  verifyCode = async code => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        this.state.verificationId,
        code
      );
      await firebase.auth().signInWithCredential(credential);
      this.completeSignUp();
    } catch (err) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [signUpFields.CODE]: 'Incorrect Code.',
        },
        processing: false,
      }));
    }
  };

  // TODO will be deprecated with react-navigation v5
  _clearState = () => {
    this.setState({
      values: {
        [signUpFields.NAME]: '',
        [signUpFields.PHONENUM]: '',
        [signUpFields.PASSWORD]: '',
        [signUpFields.CODE]: '',
      },
      errors: {
        [signUpFields.NAME]: '',
        [signUpFields.PHONENUM]: '',
        [signUpFields.PASSWORD]: '',
        [signUpFields.CODE]: '',
      },
      token: '',
      processing: false,
      // signUpPermission: false,
    });
  };

  // Purely to bypass signups for development -- developer is not required to sign up to enter home screen.
  // Configures to use David Ro's test account
  _devBypass = async () => {
    // Doesn't enforce any resolution for this async call
    // await AsyncStorage.setItem('userId', 'recimV9zs2StWB2Mj');
    // this.props.navigation.navigate('App');
  };

  // Sign up function. It sets the user token in local storage
  // to be the fname + lname and then navigates to homescreen.
  _asyncSignUp = async customerId => {
    await Analytics.setUserId(customerId);
    await AsyncStorage.setItem('userId', customerId);
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
        alert('Failed to get push token for push notification!');
        return;
      }
      const token = await Notifications.getExpoPushTokenAsync();
      await this.setState({ token });
    } else {
      alert('Must use physical device for Push Notifications');
    }
  };

  // Add customer to Airtable, creating a push token record first.
  addCustomer = async () => {
    const { token, values } = this.state;
    const name = values[signUpFields.NAME];
    const phoneNumber = values[signUpFields.PHONENUM];
    const password = values[signUpFields.PASSWORD];
    try {
      let pushTokenId = null;
      if (token) {
        pushTokenId = await createPushTokens({ token });
      }
      const customerId = await createCustomers({
        name,
        phoneNumber,
        password,
        points: 0,
        pushTokenIds: pushTokenId ? [pushTokenId] : null,
      });

      return customerId;
    } catch (err) {
      console.error('[SignUpScreen] (addCustomer) Airtable:', err);
    }
  };

  // Handle form submission. Validate fields first, then check duplicates.
  // If there are no errors, add customer to Airtable.
  handleSubmit = async () => {
    try {
      this.setState({ processing: true });
      // Check for duplicates first
      const formattedPhoneNumber = formatPhoneNumber(
        this.state.values[signUpFields.PHONENUM]
      );
      const duplicateCustomers = await getCustomersByPhoneNumber(
        formattedPhoneNumber
      );
      if (duplicateCustomers.length !== 0) {
        console.log('Duplicate customer');
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            [signUpFields.PHONENUM]: 'Phone number already in use.',
          },
          processing: false,
        }));
        return;
      }

      // Pops up a captcha for verification.
      this.openRecaptcha();
    } catch (err) {
      console.error('[SignUpScreen] (handleSubmit) Airtable:', err);
    }
    Keyboard.dismiss();
  };

  completeSignUp = async () => {
    const customerId = await this.addCustomer();
    this._clearState();
    await this._asyncSignUp(customerId);
  };

  // Check for an error with updated text
  // Set errors and updated text in state
  updateError = async (text, signUpField) => {
    let error = false;
    let errorMsg = '';
    // const fieldValue = this.state.values[signUpField];
    // validate returns null if no error is found
    switch (signUpField) {
      case signUpFields.PHONENUM:
        errorMsg = validate('phoneNumber', text);
        error = errorMsg !== null;
        break;
      case signUpFields.PASSWORD:
        errorMsg = validate('password', text);
        error = errorMsg !== null;
        break;
      case signUpFields.NAME:
        error = !text.replace(/\s/g, '').length;
        if (error) errorMsg = 'Name cannot be blank';
        break;
      case signUpFields.CODE:
        errorMsg = validate('code', text);
        error = errorMsg !== null;
        break;
      default:
        console.log('Not reached');
    }

    this.setState(prevState => ({
      errors: { ...prevState.errors, [signUpField]: errorMsg },
      values: { ...prevState.values, [signUpField]: text },
    }));

    return error;
  };

  // onBlur callback is required in case customer taps on field, does nothing, and taps out
  onBlur = async signUpField => {
    await this.updateError(signUpField);
  };

  // onTextChange does a check before updating errors
  // It can only remove errors, not trigger them
  onTextChange = async (text, signUpField) => {
    // Only update error if there is currently an error
    // Unless field is password, since it is generally the last field to be filled out
    if (
      this.state.errors[signUpField] ||
      signUpField === signUpFields.PASSWORD
    ) {
      await this.updateError(text, signUpField);
    } else {
      this.setState(prevState => ({
        values: { ...prevState.values, [signUpField]: text },
      }));
    }
  };

  render() {
    const { errors, processing, values } = this.state;

    // Initially, button should be disabled
    // Until all fields have been (at least) filled out
    const fieldsFilled =
      values[signUpFields.NAME] &&
      values[signUpFields.PHONENUM] &&
      values[signUpFields.PASSWORD];
    const noErrors =
      !errors[signUpFields.NAME] &&
      !errors[signUpFields.PHONENUM] &&
      !errors[signUpFields.PASSWORD];

    const signUpPermission = fieldsFilled && noErrors && !processing;

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <AuthScreenContainer>
            <BackButton
              onPress={() => this.setModalVisible(!this.state.modalVisible)}>
              <FontAwesome5 name="arrow-left" solid size={24} />
            </BackButton>
            <BigTitle>Verify your number.</BigTitle>
            <FormContainer>
              <AuthTextField
                fieldType="Verification"
                value={this.state.values[signUpFields.CODE]}
                onBlurCallback={value =>
                  this.updateError(value, signUpFields.CODE)
                }
                changeTextCallback={async text =>
                  this.onTextChange(text, signUpFields.CODE)
                }
                error={this.state.errors[signUpFields.CODE]}
              />
            </FormContainer>
            <FilledButtonContainer
              style={{ marginTop: 24, alignSelf: 'flex-end' }}
              color={Colors.primaryGreen}
              width="100%"
              onPress={() =>
                this.verifyCode(this.state.values[signUpFields.CODE])
              }>
              <ButtonLabel color={Colors.lightest}>Verify</ButtonLabel>
            </FilledButtonContainer>
          </AuthScreenContainer>
        </Modal>

        <FirebaseRecaptchaVerifierModal
          ref={this.state.ref}
          firebaseConfig={firebaseConfig}
        />

        <AuthScreenContainer>
          <BackButton onPress={() => this.props.navigation.goBack(null)}>
            <FontAwesome5 name="arrow-left" solid size={24} />
          </BackButton>
          <BigTitle>Sign Up</BigTitle>
          <FormContainer>
            <AuthTextField
              fieldType="Name"
              value={this.state.values[signUpFields.NAME]}
              onBlurCallback={value =>
                this.updateError(value, signUpFields.NAME)
              }
              changeTextCallback={async text =>
                this.onTextChange(text, signUpFields.NAME)
              }
              error={this.state.errors[signUpFields.NAME]}
            />

            <AuthTextField
              fieldType="Phone Number"
              value={this.state.values[signUpFields.PHONENUM]}
              onBlurCallback={value =>
                this.updateError(value, signUpFields.PHONENUM)
              }
              changeTextCallback={text =>
                this.onTextChange(text, signUpFields.PHONENUM)
              }
              error={this.state.errors[signUpFields.PHONENUM]}
            />

            <AuthTextField
              fieldType="Password"
              value={this.state.values[signUpFields.PASSWORD]}
              onBlurCallback={value =>
                this.updateError(value, signUpFields.PASSWORD)
              }
              changeTextCallback={text =>
                this.onTextChange(text, signUpFields.PASSWORD)
              }
              error={this.state.errors[signUpFields.PASSWORD]}
            />
          </FormContainer>
          <FilledButtonContainer
            style={{ marginTop: 24, alignSelf: 'flex-end' }}
            color={
              !signUpPermission ? Colors.lightestGreen : Colors.primaryGreen
            }
            width="100%"
            onPress={() => this.handleSubmit()}
            disabled={!signUpPermission}>
            <ButtonLabel color={Colors.lightest}>Sign Up</ButtonLabel>
          </FilledButtonContainer>
        </AuthScreenContainer>
      </ScrollView>
    );
  }
}

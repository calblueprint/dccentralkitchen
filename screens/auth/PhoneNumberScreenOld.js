import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Keyboard } from 'react-native';
import AuthTextField from '../../components/AuthTextField';
import {
  ButtonLabel,
  Caption,
  FilledButtonContainer,
  Title,
} from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
import { getCustomersByPhoneNumber } from '../../lib/airtable/request';
import { formatPhoneNumberInput, inputFields } from '../../lib/authUtils';
import { logAuthErrorToSentry, logErrorToSentry } from '../../lib/logUtils';
import {
  AuthScreenContainer,
  AuthScrollContainer,
  BackButton,
  FormContainer,
} from '../../styled/auth';
import { JustifyCenterContainer } from '../../styled/shared';
import validate from './validation';

export default class PhoneNumberScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {
        [inputFields.PHONENUM]: '',
      },
      errors: {
        [inputFields.PHONENUM]: '',
        submit: '',
      },
      token: null,
    };
  }

  // From SignUpScreen. Sets the user token in local storage
  // to be the customer's recordId and then navigates to the Map screen.
  _asyncLogIn = async (customerId) => {
    await AsyncStorage.setItem('customerId', customerId);
    Keyboard.dismiss();
    this.props.navigation.navigate('App');
  };

  // From SignUpScreen. Sets the user token in local storage
  // to be the customer's recordId and then navigates to the Map screen.
  _asyncVerify = async (hasAccount) => {
    Keyboard.dismiss();
    this.props.navigation.navigate('Verify', {
      number: this.state.values[inputFields.PHONENUM],
      hasAccount,
      resend: this.openRecaptcha,
    });
  };

  // 5/13/2020: unused
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
      const pushToken = await Notifications.getExpoPushTokenAsync();
      await this.setState({ token: pushToken });
    } else {
      Alert.alert('Must use physical device for Push Notifications');
    }
  };

  // Logs the customer in if found in Airtable
  handleSubmit = async () => {
    const { values, token } = this.state;
    const phoneNumber = values[inputFields.PHONENUM];

    try {
      let error = '';
      let customer = null;

      // Find customer in Airtable
      const customers = await getCustomersByPhoneNumber(phoneNumber);

      // Phone number is registered
      if (customers.length === 1) {
        [customer] = customers;
        console.log('CUSTOMER EXISTS! VERIFY PHONE TO LOG IN ');
        this._asyncVerify(true);
        // !!! CUSTOMER EXISTS! VERIFY PHONE
      } else if (customers.length > 1) {
        console.log('DATABASE ERROR DUPLICATE CUSTOMER');
        // In case of database malformation, may return more than one record
        // TODO this message is a design edge case
        error =
          'Database error: more than one customer found with this login information. Please report an issue so we can fix it for you!';
      } else {
        console.log('DOES NOT EXIST SIGN UP');
        // !!! DOES NOT EXIST -- SIGN UP
      }

      if (error !== '') {
        logAuthErrorToSentry({
          screen: 'PhoneNumberScreen',
          action: 'handleSubmit',
          attemptedPhone: phoneNumber,
          error,
        });
      } else {
        // if login works, register the user
        // setUserLog(customer);
        // Analytics.logEvent('log_in_complete', {
        //   customer_id: customer.id,
        // });
        // Sentry.captureMessage('Log In Successful');
      }
      this.setState((prevState) => ({
        errors: { ...prevState.errors, submit: error },
      }));
    } catch (err) {
      console.error('[PhoneNumberScreen] Airtable:', err);
      logAuthErrorToSentry({
        screen: 'PhoneNumberScreen',
        action: 'handleSubmit',
        attemptedPhone: phoneNumber,
        error: err,
      });
    }
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
      default:
        console.log('Not reached');
    }

    this.setState((prevState) => ({
      errors: { ...prevState.errors, [inputField]: errorMsg },
      values: { ...prevState.values, [inputField]: text },
    }));

    return error;
  };

  // onBlur callback is required in case customer taps on field, does nothing, and taps out
  onBlur = async (inputField) => {
    await this.updateError(inputField);
  };

  findCustomer = async () => {
    try {
      let customer = null;
      const customers = await getCustomersByPhoneNumber(
        this.state.values[inputFields.PHONENUM]
      );
      if (customers.length === 1) {
        [customer] = customers;
        // If the customer is setting a password after registering in store through the Set a Password screen
        if (!this.state.forgot && customer.password) {
          Alert.alert(
            '',
            'This phone number already has a password set. Log in to access your account.',
            [
              {
                text: 'Log In',
                onPress: () => this.props.navigation.navigate('LogIn'),
              },
              {
                text: 'Cancel',
                style: 'cancel',
              },
            ]
          );
          return false;
        }
        // If the customer tries to set a password after registering store but goes through the Forgot Password screen
        if (this.state.forgot && !customer.password) {
          Alert.alert(
            'Phone number registered without a password',
            `${
              this.state.values[inputFields.PHONENUM]
            } does not have a password yet. Set a password to finish setting up your account.`,
            [
              {
                text: 'Set a password',
                onPress: () =>
                  this.props.navigation.dispatch(
                    StackActions.replace('Reset', { forgot: false })
                  ),
              },
              {
                text: 'Cancel',
                style: 'cancel',
              },
            ]
          );
          return false;
        }

        this.setState({ customer });
      } else {
        const errorMsg = 'No account registered with this number';
        this.setState((prevState) => ({
          errors: { ...prevState.errors, [inputFields.PHONENUM]: errorMsg },
        }));
        return false;
      }
    } catch (err) {
      console.log(err);
      logErrorToSentry({
        screen: 'PasswordResetScreen',
        action: 'findCustomer',
        error: err,
      });
    }
    return true;
  };

  openRecaptcha = async () => {
    const duplicate = await this.findCustomer();
    if (!duplicate) {
      return;
    }
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
        screen: 'PasswordResetScreen',
        action: 'openRecaptcha',
        error: err,
      });
    }
  };

  // onTextChange does a check before updating errors
  // It can only remove errors, not trigger them
  onTextChange = async (text, inputField) => {
    // Only update error if there is currently an error
    // Unless field is password, since it is generally the last field to be filled out
    if (this.state.errors[inputField]) {
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
        // Clear submission error
        errors: { ...prevState.errors, submit: '' },
      }));
    }
  };

  render() {
    const { errors, values } = this.state;

    // Initially, button should be disabled
    // Until all fields have been (at least) filled out
    const fieldsFilled = values[inputFields.PHONENUM].length === 14;
    const noErrors = !errors.submit && !errors[inputFields.PHONENUM];

    const logInPermission = fieldsFilled && noErrors;

    return (
      <AuthScreenContainer>
        <AuthScrollContainer>
          <BackButton onPress={() => this.props.navigation.goBack(null)}>
            <FontAwesome5 name="arrow-left" solid size={24} />
          </BackButton>
          <Title>Phone Number</Title>
          <FormContainer>
            <AuthTextField
              fieldType="Phone Number"
              value={this.state.values[inputFields.PHONENUM]}
              onBlurCallback={(value) => {
                this.updateError(value, inputFields.PHONENUM);
              }}
              changeTextCallback={(text) =>
                this.onTextChange(text, inputFields.PHONENUM)
              }
              error={this.state.errors[inputFields.PHONENUM]}
            />
            <Caption
              style={{ alignSelf: 'center', fontSize: 14 }}
              color={Colors.error}>
              {this.state.errors.submit}
            </Caption>
          </FormContainer>
          <JustifyCenterContainer>
            <FilledButtonContainer
              style={{ marginTop: 24, marginBottom: 12 }}
              color={
                !logInPermission ? Colors.lightestGreen : Colors.primaryGreen
              }
              width="100%"
              onPress={() => this.handleSubmit()}
              disabled={!logInPermission}>
              <ButtonLabel color={Colors.lightText}>Next</ButtonLabel>
            </FilledButtonContainer>
          </JustifyCenterContainer>
        </AuthScrollContainer>
      </AuthScreenContainer>
    );
  }
}

PhoneNumberScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

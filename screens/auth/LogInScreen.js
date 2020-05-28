import { FontAwesome5 } from '@expo/vector-icons';
import { Notifications } from 'expo';
import Constants from 'expo-constants';
import * as Analytics from 'expo-firebase-analytics';
import * as Permissions from 'expo-permissions';
import PropTypes from 'prop-types';
import React from 'react';
import { Alert, AsyncStorage, Keyboard } from 'react-native';
import * as Sentry from 'sentry-expo';
import AuthTextField from '../../components/AuthTextField';
import {
  BigTitle,
  ButtonContainer,
  ButtonLabel,
  Caption,
  FilledButtonContainer,
} from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
import { getCustomersByPhoneNumber } from '../../lib/airtable/request';
import {
  encryptPassword,
  formatPhoneNumber,
  inputFields,
  updateCustomerPushTokens,
} from '../../lib/authUtils';
import { logAuthErrorToSentry } from '../../lib/logUtils';
import {
  AuthScreenContainer,
  AuthScrollContainer,
  BackButton,
  FormContainer,
} from '../../styled/auth';
import { JustifyCenterContainer } from '../../styled/shared';
import validate from './validation';

export default class LogInScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {
        [inputFields.PHONENUM]: '',
        [inputFields.PASSWORD]: '',
      },
      errors: {
        [inputFields.PHONENUM]: '',
        // Error field for password is not used but this makes the code cleaner
        [inputFields.PASSWORD]: '',
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
    const password = values[inputFields.PASSWORD];

    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

    try {
      let error = '';
      let customer = null;

      // Find customer in Airtable
      const customers = await getCustomersByPhoneNumber(formattedPhoneNumber);

      // Phone number is registered
      if (customers.length === 1) {
        [customer] = customers;

        // Check if password is correct
        // We use the record ID from Airtable as the salt to encrypt
        const encrypted = await encryptPassword(customer.id, password);
        if (encrypted !== customer.password) {
          error = 'Phone number or password is incorrect.';
        } else {
          // Match found; update push tokens if necessary
          await updateCustomerPushTokens(customer, token);
          // Log in
          await this._asyncLogIn(customer.id);
        }
      } else if (customers.length > 1) {
        // In case of database malformation, may return more than one record
        // TODO this message is a design edge case
        error =
          'Database error: more than one customer found with this login information. Please report an issue so we can fix it for you!';
      } else {
        // Returns empty array if no customer is found
        error = 'Phone number or password is incorrect.';
      }

      if (error !== '') {
        logAuthErrorToSentry({
          screen: 'LogInScreen',
          action: 'handleSubmit',
          attemptedPhone: formattedPhoneNumber,
          attemptedPass: password,
          error,
        });
      } else {
        // if login works, register the user
        Analytics.setUserId(customer.id);
        Analytics.setUserProperties({
          name: customer.name,
          phoneNumber,
        });
        Sentry.configureScope((scope) => {
          scope.setUser({
            id: customer.id,
            phoneNumber: formattedPhoneNumber,
            username: customer.name,
          });
          Sentry.captureMessage('Log In Successful');
        });
      }
      this.setState((prevState) => ({
        errors: { ...prevState.errors, submit: error },
      }));
    } catch (err) {
      console.error('[LogInScreen] Airtable:', err);
      logAuthErrorToSentry({
        screen: 'loginScreen',
        action: 'handleSubmit',
        attemptedPhone: formattedPhoneNumber,
        attemptedPass: password,
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

  // onTextChange does a check before updating errors
  // It can only remove errors, not trigger them
  onTextChange = async (text, inputField) => {
    // Only update error if there is currently an error
    // Unless field is password, since it is generally the last field to be filled out
    if (this.state.errors[inputField]) {
      await this.updateError(text, inputField);
    } else {
      this.setState((prevState) => ({
        values: { ...prevState.values, [inputField]: text },
        // Clear submission error
        errors: { ...prevState.errors, submit: '' },
      }));
    }
  };

  render() {
    const { errors, values } = this.state;

    // Initially, button should be disabled
    // Until all fields have been (at least) filled out
    const fieldsFilled =
      values[inputFields.PHONENUM] && values[inputFields.PASSWORD];
    const noErrors =
      !errors.submit &&
      !errors[inputFields.PHONENUM] &&
      !errors[inputFields.PASSWORD];

    const logInPermission = fieldsFilled && noErrors;

    return (
      <AuthScreenContainer>
        <AuthScrollContainer
          ref={(ref) => {
            this.scrollView = ref;
          }}>
          <BackButton onPress={() => this.props.navigation.goBack(null)}>
            <FontAwesome5 name="arrow-left" solid size={24} />
          </BackButton>
          <BigTitle>Log In</BigTitle>
          <FormContainer>
            <AuthTextField
              fieldType="Phone Number"
              value={this.state.values[inputFields.PHONENUM]}
              onBlurCallback={(value) => {
                this.updateError(value, inputFields.PHONENUM);
                this.scrollView.scrollToEnd({ animated: true });
              }}
              changeTextCallback={(text) =>
                this.onTextChange(text, inputFields.PHONENUM)
              }
              error={this.state.errors[inputFields.PHONENUM]}
            />
            <AuthTextField
              fieldType="Password"
              value={this.state.values[inputFields.PASSWORD]}
              changeTextCallback={(text) =>
                this.onTextChange(text, inputFields.PASSWORD)
              }
              error={this.state.errors[inputFields.PASSWORD]}
            />
            <Caption
              style={{ alignSelf: 'center', fontSize: 14 }}
              color={Colors.error}>
              {this.state.errors.submit}
            </Caption>
          </FormContainer>
          <JustifyCenterContainer>
            <FilledButtonContainer
              style={{ marginTop: 24 }}
              color={
                !logInPermission ? Colors.lightestGreen : Colors.primaryGreen
              }
              width="100%"
              onPress={() => this.handleSubmit()}
              disabled={!logInPermission}>
              <ButtonLabel color={Colors.lightText}>Log in</ButtonLabel>
            </FilledButtonContainer>
            <ButtonContainer
              onPress={async () => this.props.navigation.navigate('Reset')}>
              <ButtonLabel
                style={{ textTransform: 'none', marginVertical: 12 }}
                color={Colors.primaryGreen}>
                Forgot Password?
              </ButtonLabel>
            </ButtonContainer>
          </JustifyCenterContainer>
        </AuthScrollContainer>
      </AuthScreenContainer>
    );
  }
}

LogInScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

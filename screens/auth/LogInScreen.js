import { FontAwesome5 } from '@expo/vector-icons';
import { Notifications } from 'expo';
import Constants from 'expo-constants';
import * as Analytics from 'expo-firebase-analytics';
import * as Permissions from 'expo-permissions';
import PropTypes from 'prop-types';
import React from 'react';
import { AsyncStorage, ScrollView } from 'react-native';
import * as Sentry from 'sentry-expo';
import AuthTextField from '../../components/AuthTextField';
import {
  BigTitle,
  ButtonLabel,
  Caption,
  FilledButtonContainer,
} from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
import { getCustomersByPhoneNumber } from '../../lib/airtable/request';
import {
  encryptPassword,
  formatPhoneNumber,
  updateCustomerPushTokens,
} from '../../lib/authUtils';
import { logAuthErrorToSentry } from '../../lib/logUtils';
import {
  AuthScreenContainer,
  BackButton,
  FormContainer,
} from '../../styled/auth';
import { JustifyCenterContainer } from '../../styled/shared';

export default class LogInScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: '',
      password: '',
      error: '',
      token: null,
    };
  }

  componentDidMount() {}

  // From SignUpScreen. Sign in function. It sets the user token in local storage
  // to be the user ID and then navigates to homescreen.
  _asyncLogIn = async (customerId) => {
    await AsyncStorage.setItem('customerId', customerId);
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
      const pushToken = await Notifications.getExpoPushTokenAsync();
      await this.setState({ token: pushToken });
    } else {
      alert('Must use physical device for Push Notifications');
    }
  };

  // This function will reformat the phone number to (XXX) XXX-XXXX and sign the user in if
  // the user is found.
  handleSubmit = async () => {
    const { password, phoneNumber, token } = this.state;
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

      this.setState({
        error,
      });
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

  render() {
    const { phoneNumber, password } = this.state;
    const logInPermission =
      phoneNumber.length === 10 &&
      password.length >= 8 &&
      this.state.error === '';

    return (
      <AuthScreenContainer>
        <ScrollView
          ref={(ref) => {
            this.scrollView = ref;
          }}
          style={{ flex: 1 }}
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}>
          <BackButton onPress={() => this.props.navigation.goBack(null)}>
            <FontAwesome5 name="arrow-left" solid size={24} />
          </BackButton>
          <BigTitle>Log In</BigTitle>
          <FormContainer>
            <AuthTextField
              fieldType="Phone Number"
              value={this.state.phoneNumber}
              changeTextCallback={async (text) => {
                this.setState({ phoneNumber: text, error: '' });
              }}
              onBlurCallback={() =>
                this.scrollView.scrollToEnd({ animated: true })
              }
              // Display error indicator ('no text') only when login fails
              error={this.state.error ? ' ' : ''}
            />
            <AuthTextField
              fieldType="Password"
              value={this.state.password}
              changeTextCallback={async (text) => {
                this.setState({ password: text, error: '' });
              }}
              // Display error indicator ('no text') only when login fails
              error={this.state.error ? ' ' : ''}
            />
            <Caption
              style={{ alignSelf: 'center', fontSize: 14 }}
              color={Colors.error}>
              {this.state.error}
            </Caption>
          </FormContainer>
          <JustifyCenterContainer>
            <FilledButtonContainer
              style={{ marginVertical: 24 }}
              color={
                !logInPermission ? Colors.lightestGreen : Colors.primaryGreen
              }
              width="100%"
              onPress={() => this.handleSubmit()}
              disabled={!logInPermission}>
              <ButtonLabel color={Colors.lightest}>Log in</ButtonLabel>
            </FilledButtonContainer>

            {/* TODO @tommypoa: Forgot password functionality

          <ForgotPasswordButtonContainer>
            <ButtonContainer>
              <Body color={Colors.primaryGreen}>Forgot password?</Body>
            </ButtonContainer>
          </ForgotPasswordButtonContainer> */}
          </JustifyCenterContainer>
        </ScrollView>
      </AuthScreenContainer>
    );
  }
}

LogInScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

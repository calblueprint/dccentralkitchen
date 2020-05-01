import { FontAwesome5 } from '@expo/vector-icons';
import { Notifications } from 'expo';
import Constants from 'expo-constants';
import * as Analytics from 'expo-firebase-analytics';
import * as Permissions from 'expo-permissions';
import PropTypes from 'prop-types';
import React from 'react';
import { AsyncStorage, Keyboard } from 'react-native';
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
import { getAllCustomers } from '../../lib/airtable/request';
import {
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
  _asyncLogIn = async customerId => {
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
      const customers = await getAllCustomers(
        `AND({Phone Number} = '${formattedPhoneNumber}', {Password} = '${password}')`
      );
      // Returns empty array if no customer is found
      if (customers.length === 1) {
        customer = customers[0];
        // If customer exists, we should update their push tokens
        await updateCustomerPushTokens(customer, token);
        // Log in
        await this._asyncLogIn(customer.id);
      } else if (customers.length > 1) {
        // In case of database malformation, may return more than one record
        // TODO this message is a design edge case
        error =
          'Database error: more than one customer found with this login information. Please report an issue so we can fix it for you!';
      } else {
        // No customer found
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
          phoneNumber: phoneNumber,
        });
        Sentry.configureScope(scope => {
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
        <BackButton onPress={() => this.props.navigation.goBack(null)}>
          <FontAwesome5 name="arrow-left" solid size={24} />
        </BackButton>
        <BigTitle>Log In</BigTitle>
        <FormContainer>
          <AuthTextField
            fieldType="Phone Number"
            value={this.state.phoneNumber}
            changeTextCallback={async text => {
              this.setState({ phoneNumber: text, error: '' });
            }}
            // Display error indicator ('no text') only when login fails
            error={this.state.error ? ' ' : ''}
          />
          <AuthTextField
            fieldType="Password"
            value={this.state.password}
            changeTextCallback={async text => {
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
            color={
              !logInPermission ? Colors.lightestGreen : Colors.primaryGreen
            }
            width="100%"
            onPress={() => this.handleSubmit()}
            disabled={!logInPermission}>
            <ButtonLabel color={Colors.lightest}>Log in</ButtonLabel>
          </FilledButtonContainer>

          <ButtonContainer
            onPress={async () => this.props.navigation.navigate('Reset')}>
            <ButtonLabel
              style={{ textTransform: 'none', marginTop: 12 }}
              color={Colors.primaryGreen}>
              Forgot Password?
            </ButtonLabel>
          </ButtonContainer>
        </JustifyCenterContainer>
      </AuthScreenContainer>
    );
  }
}

LogInScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

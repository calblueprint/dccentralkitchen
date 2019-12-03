import { Notifications } from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import React from 'react';
import { AsyncStorage, Button, Text, TextInput, View } from 'react-native';

import { ErrorMsg, Input, LoginContainer } from '../../styles/auth';
import { lookupCustomer, updateCustomerPushTokens } from './authAirtable';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: '',
      password: '',
      errorMsg: '',
      token: null
    };
  }

  componentDidMount() {
    this.registerForPushNotificationsAsync();

    // From SignUpScreen.js, see comment there for details
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  // From SignUpScreen. Sign in function. It sets the user token in local storage
  // to be the user ID and then navigates to homescreen.
  _asyncSignIn = async userId => {
    await AsyncStorage.setItem('userId', userId);
    console.log(userId);
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
  handleSubmit() {
    let formattedPhoneNumber = this.state.phoneNumber;
    formattedPhoneNumber = formattedPhoneNumber.replace('[^0-9]', '');
    formattedPhoneNumber = `(${formattedPhoneNumber.slice(
      0,
      3
    )}) ${formattedPhoneNumber.slice(3, 6)}-${formattedPhoneNumber.slice(
      6,
      10
    )}`;

    lookupCustomer(formattedPhoneNumber, this.state.password)
      .then(customerInfo => {
        if (customerInfo) {
          console.log(
            'Customer lookup successful. Customer Record ID:',
            customerInfo.custId
          );
          this.setState({ errorMsg: '' });
          return customerInfo;
        }
        // If no records exist, resolves with null; set error message
        this.setState({
          errorMsg: 'Incorrect phone number or password. Please try again.',
          phoneNumber: '',
          password: ''
        });
        return null;
      })
      .then(customerInfo => {
        if (customerInfo) {
          updateCustomerPushTokens(customerInfo, this.state.token)
            .then(customerId => {
              if (customerId) {
                this._asyncSignIn(customerId);
              }
              // Otherwise, lookup failed
              return null;
            })
            .catch(err => console.error(err));
        }
        // Otherwise, lookup failed
        return null;
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <LoginContainer>
        <Input
          placeholder="Phone Number (i.e. 1234567890)"
          keyboardType="number-pad"
          maxLength={10}
          value={this.state.phoneNumber}
          onChangeText={text => this.setState({ phoneNumber: text })}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
        />
        <Button title="Log In" onPress={() => this.handleSubmit()} />
        <ErrorMsg>{this.state.errorMsg}</ErrorMsg>
      </LoginContainer>
    );
  }
}

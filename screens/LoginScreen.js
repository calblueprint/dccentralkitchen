import { Notifications } from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import React from 'react';
import { AsyncStorage, Button, StyleSheet, Text, TextInput, View } from 'react-native';

import BASE from '../lib/common';
import { checkForDuplicates, createPushToken, lookupCustomer, updateCustomerPushTokens } from './signup/auth_shared_airtable';

// import registerForPushNotificationsAsync from './signup/notifications';

export default class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: '',
      password: '',
      userDisplay: '',
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
  _asyncSignin = async userId => {
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
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
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
  async handleSubmit() {
    let formattedPhoneNumber = this.state.phoneNumber;
    formattedPhoneNumber = formattedPhoneNumber.replace('[^0-9]', '');
    formattedPhoneNumber = `(${formattedPhoneNumber.slice(
      0,
      3
    )}) ${formattedPhoneNumber.slice(3, 6)}-${formattedPhoneNumber.slice(
      6,
      10
    )}`;

    await lookupCustomer(formattedPhoneNumber, this.state.password)
      .then(resp => {
        if (resp) {
          let customerInfo = resp;
          this._asyncSignin(customerInfo.custId);
          this.setState({
            userDisplay: customerInfo.custId,
            phoneNumber: '',
            password: ''
          });
        }
      })
      .catch(err => {
        this.setState({ userDisplay: err, phoneNumber: '', password: '' });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Phone Number (i.e. 1234567890)"
          keyboardType="number-pad"
          maxLength={10}
          value={this.state.phoneNumber}
          onChangeText={text => this.setState({ phoneNumber: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
        />
        <Button title="Log In" onPress={() => this.handleSubmit()} />
        <Text style={styles.text}>{this.state.userDisplay}</Text>
      </View>
    );
  }
}

// TODO @anniero98 refactor to use styled-components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: '20%',
    alignContent: 'center'
  },
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500'
  },
  text: {
    fontSize: 14,
    textAlign: 'center'
  }
});

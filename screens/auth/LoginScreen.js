import { Notifications } from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import React from 'react';
import { AsyncStorage, Button } from 'react-native';
import { lookupCustomer, updateCustomerPushTokens } from '../../lib/authUtils';
import {
  ErrorMsg,
  Input,
  LoginContainer,
  InputContainer,
  InputsContainer,
  LoginButtonContainer
} from '../../styled/auth';
import { JustifyCenterContainer } from '../../styled/shared';
import Colors from '../../assets/Colors';
import {
  BigTitle,
  Body,
  ButtonLabel,
  ButtonContainer,
  Caption,
  FilledButtonContainer
} from '../../components/BaseComponents';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: '',
      password: '',
      errorMsg: '',
      token: null,
      phoneNumBool: false,
      passwordBool: false,
      booleans: ['phoneNumBool', 'passwordBool']
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

  onFocus(index) {
    this.setState({
      [this.state.booleans[index]]: true
    });
  }

  onBlur(index) {
    this.setState({
      [this.state.booleans[index]]: false
    });
  }

  render() {
    return (
      <LoginContainer>
        <BigTitle>Log in</BigTitle>
        <InputsContainer>
          <InputContainer>
            <Caption
              color={
                this.state.phoneNumBool
                  ? Colors.primaryGreen
                  : Colors.activeText
              }>
              {' '}
              Phone Number
            </Caption>
            <Input
              onBlur={() => this.onBlur(0)}
              onFocus={() => this.onFocus(0)}
              placeholder="513-668-6868"
              keyboardType="number-pad"
              maxLength={10}
              value={this.state.phoneNumber}
              onChangeText={text => this.setState({ phoneNumber: text })}
              bcolor={
                this.state.phoneNumBool
                  ? Colors.primaryGreen
                  : Colors.activeText
              }
            />
          </InputContainer>

          <InputContainer>
            <Input
              onBlur={() => this.onBlur(1)}
              onFocus={() => this.onFocus(1)}
              placeholder="Password"
              secureTextEntry
              onChangeText={text => this.setState({ password: text })}
              value={this.state.password}
              color={
                this.state.passwordBool
                  ? Colors.primaryGreen
                  : Colors.activeText
              }
            />
          </InputContainer>
        </InputsContainer>
        <JustifyCenterContainer>
          <LoginButtonContainer>
            <FilledButtonContainer
              width="291px"
              onPress={() => this.handleSubmit()}>
              <ButtonLabel color="white">LOG IN</ButtonLabel>
            </FilledButtonContainer>
          </LoginButtonContainer>
          <ButtonContainer>
            <Body color={Colors.primaryGreen}>Forgot password?</Body>
          </ButtonContainer>
        </JustifyCenterContainer>
        <ErrorMsg>{this.state.errorMsg}</ErrorMsg>
      </LoginContainer>
    );
  }
}

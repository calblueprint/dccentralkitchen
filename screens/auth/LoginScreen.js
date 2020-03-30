import { Notifications } from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import React from 'react';
import { AsyncStorage, Button } from 'react-native';
import {
  signUpFields,
  fieldStateColors,
  lookupCustomer,
  updateCustomerPushTokens,
} from '../../lib/authUtils';
import {
  ErrorMsg,
  AuthScreenContainer,
  FormContainer,
} from '../../styled/auth';
import { JustifyCenterContainer } from '../../styled/shared';
import {
  BigTitle,
  ButtonLabel,
  FilledButtonContainer,
} from '../../components/BaseComponents';
import AuthTextField from '../../components/AuthTextField';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: '',
      password: '',
      errorMsg: '',
      token: null,
      indicators: {
        [signUpFields.PHONENUM]: [fieldStateColors.INACTIVE],
        [signUpFields.PASSWORD]: [fieldStateColors.INACTIVE],
      },
    };
  }

  componentDidMount() {
    // this.registerForPushNotificationsAsync();

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
          password: '',
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

  onFocus(signUpField) {
    const { indicators } = this.state;
    indicators[signUpField] = fieldStateColors.FOCUSED;
    this.setState({
      indicators,
    });
  }

  onBlur(signUpField) {
    const { indicators } = this.state;
    indicators[signUpField] = fieldStateColors.BLURRED;
    this.setState({
      indicators,
    });
  }

  render() {
    return (
      <AuthScreenContainer>
        <BigTitle>Log in</BigTitle>
        <FormContainer>
          <AuthTextField
            fieldType="Phone Number"
            color={this.state.indicators[signUpFields.PHONENUM]}
            value={this.state.phoneNumber}
            onBlurCallback={() => this.onBlur(signUpFields.PHONENUM)}
            onFocusCallback={() => this.onFocus(signUpFields.PHONENUM)}
            changeTextCallback={text => this.setState({ phoneNumber: text })}
          />
          <AuthTextField
            fieldType="Password"
            color={this.state.indicators[signUpFields.PASSWORD]}
            value={this.state.password}
            onBlurCallback={() => this.onBlur(signUpFields.PASSWORD)}
            onFocusCallback={() => this.onFocus(signUpFields.PASSWORD)}
            changeTextCallback={text => this.setState({ password: text })}
          />
        </FormContainer>
        <JustifyCenterContainer>
          <FilledButtonContainer
            style={{ marginTop: 104 }}
            width="100%"
            onPress={() => this.handleSubmit()}>
            <ButtonLabel color="#fff">Log in</ButtonLabel>
          </FilledButtonContainer>

          {/* TODO @tommypoa: Forgot password functionality
          
          <ForgotPasswordButtonContainer>
            <ButtonContainer>
              <Body color={Colors.primaryGreen}>Forgot password?</Body>
            </ButtonContainer>
          </ForgotPasswordButtonContainer> */}
        </JustifyCenterContainer>
        <ErrorMsg>{this.state.errorMsg}</ErrorMsg>
      </AuthScreenContainer>
    );
  }
}

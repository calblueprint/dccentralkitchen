import { FontAwesome5 } from '@expo/vector-icons';
import { Notifications } from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import React from 'react';
import { AsyncStorage } from 'react-native';
import AuthTextField from '../../components/AuthTextField';
import {
  BigTitle,
  ButtonLabel,
  FilledButtonContainer,
} from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
import { getAllCustomers } from '../../lib/airtable/request';
import {
  formatPhoneNumber,
  updateCustomerPushTokens,
} from '../../lib/authUtils';
import {
  AuthScreenContainer,
  BackButton,
  ErrorMsg,
  FormContainer,
} from '../../styled/auth';
import { JustifyCenterContainer } from '../../styled/shared';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: '',
      password: '',
      errorMsg: '',
      token: null,
      loginPermission: false,
    };
  }

  componentDidMount() {
    // this.registerForPushNotificationsAsync();
    // From SignUpScreen.js, see comment there for details
    // this._notificationSubscription = Notifications.addListener(
    //   this._handleNotification
    // );
  }

  // From SignUpScreen. Sign in function. It sets the user token in local storage
  // to be the user ID and then navigates to homescreen.
  _asyncLogin = async userId => {
    await AsyncStorage.setItem('userId', userId);
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

  handleLoginPermission = () => {
    let loginPermission;
    const { phoneNumber, password } = this.state;
    if (phoneNumber.length === 10 && password.length >= 8) {
      loginPermission = true;
    } else {
      loginPermission = false;
    }
    this.setState({ loginPermission });
  };

  // This function will reformat the phone number to (XXX) XXX-XXXX and sign the user in if
  // the user is found.
  handleSubmit = async () => {
    const { password, phoneNumber, token } = this.state;

    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
    try {
      const customer = await getAllCustomers(
        `AND({Phone Number} = '${formattedPhoneNumber}', {Password} = '${password}')`
      );
      // Handle errors
      if (customer) {
        console.log(
          'Customer lookup successful. Customer Record ID:',
          customerInfo.custId
        );
        // If customer exists, we should update their push tokens
        await updateCustomerPushTokens(customer, token);
        // Log in
        await this._asyncLogin(customer.id);
        // this.setState({ errorMsg: '' });
      } else {
        this.setState({
          errorMsg: 'Incorrect phone number or password. Please try again.',
          phoneNumber: '',
          password: '',
        });
      }
    } catch (err) {
      console.error('[LoginScreen] Airtable:', err);
    }
  };

  render() {
    return (
      <AuthScreenContainer>
        <BackButton onPress={() => this.props.navigation.goBack(null)}>
          <FontAwesome5 name="arrow-left" solid size={24} />
        </BackButton>
        <BigTitle>Log in</BigTitle>
        <FormContainer>
          <AuthTextField
            fieldType="Phone Number"
            value={this.state.phoneNumber}
            changeTextCallback={text => {
              this.handleLoginPermission();
              this.setState({ phoneNumber: text });
            }}
            onBlurCallback={() => this.handleLoginPermission()}
            error=""
          />
          <AuthTextField
            fieldType="Password"
            value={this.state.password}
            changeTextCallback={text => {
              this.handleLoginPermission();
              this.setState({ password: text });
            }}
            onBlurCallback={() => this.handleLoginPermission()}
            error=""
          />
        </FormContainer>
        <JustifyCenterContainer>
          <FilledButtonContainer
            style={{ marginTop: 104 }}
            color={
              this.state.loginPermission
                ? Colors.primaryGreen
                : Colors.lightestGreen
            }
            width="100%"
            onPress={() => this.handleSubmit()}
            disabled={!this.state.loginPermission}>
            <ButtonLabel color={Colors.lightest}>Log in</ButtonLabel>
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

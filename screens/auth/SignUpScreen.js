import { FontAwesome5 } from '@expo/vector-icons';
import { Notifications } from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import React from 'react';
import { AsyncStorage, Button, Keyboard } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AuthTextField from '../../components/AuthTextField';
import {
  BigTitle,
  ButtonLabel,
  FilledButtonContainer,
} from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
import {
  createCustomers,
  createPushTokens,
  getCustomersByPhoneNumber,
} from '../../lib/airtable/request';
import { formatPhoneNumber, signUpFields, validate } from '../../lib/authUtils';
import {
  AuthScreenContainer,
  BackButton,
  FormContainer,
} from '../../styled/auth';

export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {
        [signUpFields.NAME]: '',
        [signUpFields.PHONENUM]: '',
        [signUpFields.PASSWORD]: '',
      },
      errors: {
        [signUpFields.NAME]: '',
        [signUpFields.PHONENUM]: '',
        [signUpFields.PASSWORD]: '',
        // Duplicate phone number error - currently not being displayed
        submit: '',
      },
      token: '',
      signUpPermission: false,
    };
  }

  // TODO @johnathanzhou or @anniero98
  // Notifications is jank - the `_handleNotification` function doesn't even exist. Unclear to devs what the flow should be with receiving notifications
  componentDidMount() {
    // this.registerForPushNotificationsAsync();
    // this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  // TODO will be deprecated with react-navigation v5
  _clearState = () => {
    this.setState({
      values: {
        [signUpFields.NAME]: '',
        [signUpFields.PHONENUM]: '',
        [signUpFields.PASSWORD]: '',
      },
      errors: {
        [signUpFields.NAME]: '',
        [signUpFields.PHONENUM]: '',
        [signUpFields.PASSWORD]: '',
      },
      token: '',
      signUpPermission: false,
    });
  };

  // Purely to bypass signups for development -- developer is not required to sign up to enter home screen.
  // Configures to use David Ro's test account
  _devBypass = async () => {
    // Doesn't enforce any resolution for this async call
    await AsyncStorage.setItem('userId', 'recomWMtzSUQCcIvr');
    this.props.navigation.navigate('App');
  };

  // Sign in function. It sets the user token in local storage
  // to be the fname + lname and then navigates to homescreen.
  _asyncSignin = async customerId => {
    await AsyncStorage.setItem('userId', customerId);
    this.props.navigation.navigate('App');
  };

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDescvice) {
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

  // Update sign up permission based on whether there are any errors left
  updatePermission = async () => {
    const { errors, values } = this.state;

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

    const signUpPermission = fieldsFilled && noErrors;

    this.setState({
      signUpPermission,
    });

    return signUpPermission;
  };

  // Add customer to Airtable, creating a push token record first.
  addCustomer = async () => {
    const { token, values } = this.state;
    const name = values[signUpFields.NAME];
    const phoneNumber = values[signUpFields.PHONENUM];
    const password = values[signUpFields.PASSWORD];
    try {
      const pushTokenId = await createPushTokens({ token });
      const customerId = await createCustomers({
        name,
        phoneNumber,
        password,
        points: 0,
        pushTokenIds: [pushTokenId],
      });
      return customerId;
    } catch (err) {
      console.error('[SignUpScreen] (addCustomer) Airtable:', err);
    }
  };

  // Handle form submission. Validate fields first, then check duplicates.
  // If there are no errors, add customer to Airtable.
  handleSubmit = async () => {
    const { signUpPermission } = this.state;
    if (signUpPermission) {
      try {
        // Check for duplicates first
        const formattedPhoneNumber = formatPhoneNumber(
          this.state.values[signUpFields.PHONENUM]
        );
        const duplicateCustomers = await getCustomersByPhoneNumber(
          formattedPhoneNumber
        );
        if (duplicateCustomers.length !== 0) {
          console.log('Duplicate customer');
          await this.setState(prevState => ({
            errors: {
              ...prevState.errors,
              submit: 'Phone number already in use.',
            },
          }));
          return;
        }
        // Otherwise, add customer to Airtable
        const customerId = await this.addCustomer();
        this._clearState();
        await this._asyncSignin(customerId);
      } catch (err) {
        console.error('[SignUpScreen] (handleSubmit) Airtable:', err);
      }
    } else {
      console.log('errors');
      // alert(`${this.state.nameError}\n ${this.state.phoneNumberError}\n ${this.state.passwordError}`);
    }
    Keyboard.dismiss();
  };

  updateError = async signUpField => {
    let error = false;
    let errorMsg = '';
    const fieldValue = this.state.values[signUpField];
    // validate returns null if no error is found
    switch (signUpField) {
      case signUpFields.PHONENUM:
        errorMsg = validate('phoneNumber', fieldValue);
        error = errorMsg !== null;
        break;
      case signUpFields.PASSWORD:
        errorMsg = validate('password', fieldValue);
        error = errorMsg !== null;
        break;
      case signUpFields.NAME:
        error = !fieldValue.replace(/\s/g, '').length;
        if (error) errorMsg = 'Name cannot be blank';
        break;
      default:
        console.log('Not reached');
    }

    await this.setState(prevState => ({
      errors: { ...prevState.errors, [signUpField]: errorMsg },
    }));
    await this.updatePermission();

    return error;
  };

  // onBlur callback is required in case customer taps on field, does nothing, and taps out
  onBlur = async signUpField => {
    await this.updateError(signUpField);
  };

  // onTextChange does a check before updating errors
  // It can only remove errors, not trigger them
  onTextChange = async (text, signUpField) => {
    // Set updated value before error-checkingg
    await this.setState(prevState => ({
      values: { ...prevState.values, [signUpField]: text },
    }));

    // Only update error if there is currently an error
    if (this.state.errors[signUpField]) await this.updateError(signUpField);
    await this.updatePermission();
  };

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <AuthScreenContainer>
          <BackButton onPress={() => this.props.navigation.goBack(null)}>
            <FontAwesome5 name="arrow-left" solid size={24} />
          </BackButton>
          <BigTitle>Sign Up</BigTitle>
          <FormContainer>
            <AuthTextField
              fieldType="Name"
              value={this.state.values[signUpFields.NAME]}
              onBlurCallback={() => this.updateError(signUpFields.NAME)}
              changeTextCallback={text => {
                this.onTextChange(text, signUpFields.NAME);
              }}
              error={this.state.errors[signUpFields.NAME]}
            />

            <AuthTextField
              fieldType="Phone Number"
              value={this.state.values[signUpFields.PHONENUM]}
              onBlurCallback={() => this.updateError(signUpFields.PHONENUM)}
              changeTextCallback={text => {
                this.onTextChange(text, signUpFields.PHONENUM);
              }}
              error={this.state.errors[signUpFields.PHONENUM]}
            />

            <AuthTextField
              fieldType="Password"
              value={this.state.values[signUpFields.PASSWORD]}
              onBlurCallback={() => this.updateError(signUpFields.PASSWORD)}
              changeTextCallback={text => {
                this.onTextChange(text, signUpFields.PASSWORD);
              }}
              error={this.state.errors[signUpFields.PASSWORD]}
            />
          </FormContainer>
          <FilledButtonContainer
            style={{ marginTop: 24, alignSelf: 'flex-end' }}
            color={
              this.state.signUpPermission
                ? Colors.primaryGreen
                : Colors.lightestGreen
            }
            width="100%"
            onPress={() => this.handleSubmit()}
            disabled={!this.state.signUpPermission}>
            <ButtonLabel color={Colors.lightest}>Sign Up</ButtonLabel>
          </FilledButtonContainer>
          <Button title="Testing Bypass" onPress={() => this._devBypass()} />
        </AuthScreenContainer>
      </ScrollView>
    );
  }
}

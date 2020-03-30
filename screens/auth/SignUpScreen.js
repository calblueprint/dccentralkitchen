import { Notifications } from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import React from 'react';
import { AsyncStorage, Button, Keyboard } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../../assets/Colors';
import AuthTextField from '../../components/AuthTextField';
import {
  BigTitle,
  ButtonLabel,
  FilledButtonContainer,
} from '../../components/BaseComponents';
import {
  createCustomers,
  createPushTokens,
  getCustomersByPhoneNumber,
} from '../../lib/airtable/request';
import {
  fieldStateColors,
  formatPhoneNumber,
  signUpFields,
  validate,
} from '../../lib/authUtils';
import { AuthScreenContainer, FormContainer } from '../../styled/auth';

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
        [signUpFields.NAME]: 'placeholder',
        [signUpFields.PHONENUM]: 'placeholder',
        [signUpFields.PASSWORD]: 'placeholder',
        // Duplicate phone number - not being used currently
        submit: '',
      },
      indicators: {
        [signUpFields.NAME]: fieldStateColors.INACTIVE,
        [signUpFields.PHONENUM]: fieldStateColors.INACTIVE,
        [signUpFields.PASSWORD]: fieldStateColors.INACTIVE,
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

  _clearState = () => {
    this.setState({
      values: {
        [signUpFields.NAME]: '',
        [signUpFields.PHONENUM]: '',
        [signUpFields.PASSWORD]: '',
      },
      errors: {
        [signUpFields.NAME]: 'placeholder',
        [signUpFields.PHONENUM]: 'placeholder',
        [signUpFields.PASSWORD]: 'placeholder',
      },
      indicators: {
        [signUpFields.NAME]: fieldStateColors.INACTIVE,
        [signUpFields.PHONENUM]: fieldStateColors.INACTIVE,
        [signUpFields.PASSWORD]: fieldStateColors.INACTIVE,
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
      const token = await Notifications.getExpoPushTokenAsync();
      await this.setState({ token });
    } else {
      alert('Must use physical device for Push Notifications');
    }
  };

  // Update sign up permission based on whether there are any errors left
  updatePermission = async () => {
    const { errors } = this.state;
    const signUpPermission =
      !errors[signUpFields.NAME] &&
      !errors[signUpFields.PHONENUM] &&
      !errors[signUpFields.PASSWORD];

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
    const signUpPermission = await this.updatePermission();
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

  handleErrorState = async signUpField => {
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
    if (error) {
      this.setState(prevState => ({
        errors: { ...prevState.errors, [signUpField]: errorMsg },
      }));
      return fieldStateColors.ERROR;
    }
    return fieldStateColors.BLURRED;
  };

  onFocus = async signUpField => {
    const { indicators } = this.state;
    if (indicators[signUpField] !== fieldStateColors.ERROR) {
      await this.setState(prevState => ({
        indicators: {
          ...prevState.indicators,
          [signUpField]: fieldStateColors.FOCUSED,
        },
      }));
    }
  };

  // onBlur callback is required in case customer taps on field, does nothing, and taps out
  onBlur = async signUpField => {
    const updatedIndicator = await this.handleErrorState(signUpField);
    this.setState(prevState => ({
      indicators: { ...prevState.indicators, [signUpField]: updatedIndicator },
    }));
    await this.updatePermission();
  };

  onTextChange = async (signUpField, text) => {
    await this.setState(prevState => ({
      values: { ...prevState.values, [signUpField]: text },
    }));
    // Set updated value before error-checking
    const updatedIndicator = await this.handleErrorState(signUpField);
    const errorFound = updatedIndicator === fieldStateColors.ERROR;
    this.setState(prevState => ({
      indicators: { ...prevState.indicators, [signUpField]: updatedIndicator },
      errors: {
        ...prevState.errors,
        [signUpField]: errorFound ? prevState.errors[signUpField] : '',
      },
    }));
    await this.updatePermission();
  };

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <AuthScreenContainer>
          <BigTitle>Sign Up</BigTitle>
          <FormContainer>
            <AuthTextField
              fieldType="Name"
              errorMsg={this.state.errors[signUpFields.NAME]}
              color={this.state.indicators[signUpFields.NAME]}
              value={this.state.values[signUpFields.NAME]}
              onBlurCallback={() => this.onBlur(signUpFields.NAME)}
              onFocusCallback={() => this.onFocus(signUpFields.NAME)}
              changeTextCallback={text =>
                this.onTextChange(signUpFields.NAME, text)
              }
            />

            <AuthTextField
              fieldType="Phone Number"
              errorMsg={this.state.errors[signUpFields.PHONENUM]}
              color={this.state.indicators[signUpFields.PHONENUM]}
              value={this.state.values[signUpFields.PHONENUM]}
              onBlurCallback={() => this.onBlur(signUpFields.PHONENUM)}
              onFocusCallback={() => this.onFocus(signUpFields.PHONENUM)}
              changeTextCallback={text =>
                this.onTextChange(signUpFields.PHONENUM, text)
              }
            />

            <AuthTextField
              fieldType="Password"
              errorMsg={this.state.errors[signUpFields.PASSWORD]}
              color={this.state.indicators[signUpFields.PASSWORD]}
              value={this.state.values[signUpFields.PASSWORD]}
              onBlurCallback={() => this.onBlur(signUpFields.PASSWORD)}
              onFocusCallback={() => this.onFocus(signUpFields.PASSWORD)}
              changeTextCallback={text =>
                this.onTextChange(signUpFields.PASSWORD, text)
              }
            />
          </FormContainer>
          <FilledButtonContainer
            style={{ marginTop: 35 }}
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

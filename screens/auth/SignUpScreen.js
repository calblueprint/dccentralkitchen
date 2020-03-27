import { Notifications } from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import React from 'react';
import { AsyncStorage, Button, Keyboard } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import validatejs from 'validate.js';
import AuthTextField from '../../components/AuthTextField';
import {
  BigTitle,
  ButtonLabel,
  FilledButtonContainer,
} from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
import {
  checkForDuplicateCustomer,
  createCustomer,
  createPushToken,
  fieldStateColors,
  signUpFields,
} from '../../lib/authUtils';
import { AuthScreenContainer, FormContainer } from '../../styled/auth';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      nameError: '',
      password: '',
      passwordError: '',
      phoneNumber: '',
      phoneNumberError: '',
      token: '',
      indicators: {
        [signUpFields.NAME]: [fieldStateColors.INACTIVE],
        [signUpFields.PHONENUM]: [fieldStateColors.INACTIVE],
        [signUpFields.PASSWORD]: [fieldStateColors.INACTIVE],
      },
      signUpPermission: false,
    };
  }

  // TODO @johnathanzhou or @anniero98
  // Notifications is jank - the `_handleNotification` function doesn't even exist. Unclear to devs what the flow should be with receiving notifications
  componentDidMount() {
    // this.registerForPushNotificationsAsync();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  // Purely to bypass signups for development -- developer is not required to sign up to enter home screen.
  // Configures to use David Ro's test account
  _devBypass = async () => {
    // Doesn't enforce any resolution for this async call
    await AsyncStorage.setItem('userId', 'recomWMtzSUQCcIvr');
    this.props.navigation.navigate('App');
  };

  // Sign in function. It sets the user token in local storage
  // to be the fname + lname and then navigates to homescreen.
  _asyncSignin = async () => {
    await AsyncStorage.setItem('userId', this.state.id);
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

  // Helper function for adding customers to the database. Takes
  // in all the relevant information from the form and calls the
  // Airtable API to create the record.
  async addCustomer() {
    return new Promise((resolve, reject) => {
      createPushToken(this.state.token)
        .then(tokenRecords => {
          if (tokenRecords) {
            let tokenId = null;

            // Get tokenId
            tokenRecords.forEach(function process(record) {
              // Resolve with tokenId for use in other functions
              tokenId = record.getId();
            });

            // Create customer with this tokenId
            createCustomer(
              this.state.name,
              this.state.phoneNumber,
              this.state.password,
              tokenId
            )
              .then(customerRecords => {
                if (customerRecords) {
                  let custId = null;

                  customerRecords.forEach(function id(record) {
                    custId = record.getId();
                  });

                  resolve(custId);
                  return custId;
                }
                reject(new Error('Error creating new customer'));

                // double error handling?
              })
              .catch(err => {
                console.error(err);
                reject(err);
              });
          } else {
            // No tokenRecord found
            reject(new Error('Error creating new push token'));
          }
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  }

  updateErrors = async () => {
    const phoneNumberError = validate('phoneNumber', this.state.phoneNumber);
    const passwordError = validate('password', this.state.password);
    let nameError = '';
    if (!this.state.name) {
      nameError = 'Name inputs cannot be blank.';
    }
    // In case we want to do name checking using validate.js
    // const nameError = validate('name', this.state.name)

    let formattedPhoneNumber = this.state.phoneNumber;
    // eslint-disable-next-line prettier/prettier
    formattedPhoneNumber = `(${formattedPhoneNumber.slice(
      0,
      3
    )}) ${formattedPhoneNumber.slice(3, 6)}-${formattedPhoneNumber.slice(
      6,
      10
    )}`;
    // Update sign up permission based on whether there are any errors left
    let signUpPermission = false;
    if (!phoneNumberError && !passwordError && !nameError) {
      signUpPermission = true;
    }

    // Have to await this or else Airtable call may happen first
    await this.setState({
      nameError,
      phoneNumberError,
      passwordError,
      signUpPermission,
    });
    return formattedPhoneNumber;
  };

  // Handling submission. This function runs the validation functions
  // as well as the duplicate checking. If there are no errors on the
  // validation or duplicate side, then an Airtable record is created.
  async handleSubmit() {
    const formattedPhoneNumber = this.updateErrors();
    // If we don't have any bugs already with form validation,
    // we'll check for duplicates here in the Airtable.
    if (!this.state.phoneNumberError) {
      const that = this;
      await checkForDuplicateCustomer(formattedPhoneNumber).then(
        async resolvedValue => {
          if (resolvedValue) {
            // Again, must await this
            await that.setState({
              phoneNumberError: 'Phone number in use already.',
            });
          }
        }
      );
    }

    if (
      !this.state.nameError &&
      !this.state.phoneNumberError &&
      !this.state.passwordError
    ) {
      await this.addCustomer()
        .then(custId => {
          this.setState({
            name: '',
            password: '',
            passwordError: '',
            phoneNumber: '',
            phoneNumberError: '',
            token: '',
            id: custId,
          });
        })
        .catch(err => {
          console.error(err);
        })
        .then(_ => this._asyncSignin());
    } else {
      alert(
        `${this.state.nameError}\n ${this.state.phoneNumberError}\n ${this.state.passwordError}`
      );
    }
    Keyboard.dismiss();
  }

  handleErrorState(signUpField) {
    if (
      signUpField == signUpFields.PHONENUM &&
      validate('phoneNumber', this.state.phoneNumber)
    ) {
      return fieldStateColors.ERROR;
    } else if (
      signUpField == signUpFields.PASSWORD &&
      validate('password', this.state.password)
    ) {
      return fieldStateColors.ERROR;
    } else if (
      signUpField == signUpFields.NAME &&
      !this.state.name.replace(/\s/g, '').length
    ) {
      return fieldStateColors.ERROR;
    } else {
      return fieldStateColors.BLURRED;
    }
  }

  onFocus(signUpField) {
    const { indicators } = this.state;
    if (indicators[signUpField] == fieldStateColors.ERROR) {
      return;
    } else {
      indicators[signUpField] = fieldStateColors.FOCUSED;
      this.setState({
        indicators,
      });
    }
  }

  onBlur(signUpField) {
    const { indicators } = this.state;
    indicators[signUpField] = this.handleErrorState(signUpField);
    this.updateErrors();
    this.setState({
      indicators,
    });
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <AuthScreenContainer>
          <BigTitle>Sign Up</BigTitle>
          <FormContainer>
            <AuthTextField
              fieldType="Name"
              color={this.state.indicators[signUpFields.NAME]}
              value={this.state.name}
              onBlurCallback={() => this.onBlur(signUpFields.NAME)}
              onFocusCallback={() => this.onFocus(signUpFields.NAME)}
              changeTextCallback={text => this.setState({ name: text })}
            />

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
            <ButtonLabel color="white">SIGN UP</ButtonLabel>
          </FilledButtonContainer>
          <Button title="Testing Bypass" onPress={() => this._devBypass()} />
        </AuthScreenContainer>
      </ScrollView>
    );
  }
}

// This is the validate function that utilizes validate.js
// to check a fieldname based on an inputted value.
function validate(fieldName, value) {
  // Validate.js validates your values as an object
  // e.g. var form = {email: 'email@example.com'}
  // Line 8-9 creates an object based on the field name and field value
  const values = {};
  values[fieldName] = value;

  const constraints = {};
  constraints[fieldName] = validation[fieldName];
  // The values and validated against the constraints
  // the variable result hold the error messages of the field
  const result = validatejs(values, constraints);
  // If there is an error message, return it!
  if (result) {
    // Return only the field error message if there are multiple
    return result[fieldName][0];
  }
  return '';
}

// For future use, to match for better passwords
// TODO: @Johnathan Fix passwords check
const pattern = '((?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[W]).{6,20})';

// This is to create constraints for the validatejs library
const validation = {
  name: {
    presence: {
      message: 'Name inputs cannot be blank.',
    },
  },
  phoneNumber: {
    // This verifies that it's not blank.
    presence: {
      message: "^Phone number can't be blank.",
    },
    length: {
      is: 10,
      message: '^Please enter a valid phone number.',
    },
    // To check for only numbers in the future
    // format: {
    //   pattern: "/^\d+$/",
    //   message: "Phone number cannot contain nondigits."
    // }
  },

  password: {
    presence: {
      message: '^Password cannot be blank.',
    },
    length: {
      minimum: 8,
      message: '^Your password must be at least 8 characters.',
    },
    // For future use for better password checking
    // format: {
    //   pattern: "[a-z0-9]+",
    //   flags: "i",
    //   message: "Must contain at least one digit, one lowercase number, and special chracter"
    // }
  },
};

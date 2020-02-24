import { Notifications } from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import React from 'react';
import {
  AsyncStorage,
  Button,
  Keyboard,
  Text,
  TextInput,
  View
} from 'react-native';
import validatejs from 'validate.js';

import { Input, SignUpContainer } from '../../styles/auth';
import {
  checkForDuplicateCustomer,
  createCustomer,
  createPushToken
} from './authAirtable';

// I abstracted portions of the validation flow into these files
// but there's a weird bug "https://github.com/facebook/react-native/issues/4968"
// so I put it all in this one file.
// TODO: @Johnathan Abstract everything in to separate files
// TODO: @Johnathan Refactor Airtable calls

// import { MonoText } from 'screens/signup/textfield.jsx'
// import validation from  'screens/signup/validation'
// import validate from  'screens/signup/validation_wrapper'

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      nameError: '',
      password: '',
      passwordError: '',
      phoneNumber: '',
      phoneNumberError: '',
      token: ''
    };
  }

  componentDidMount() {
    this.registerForPushNotificationsAsync();

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
              this.state.firstName,
              this.state.lastName,
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

  // Handling submission. This function runs the validation functions
  // as well as the duplicate checking. If there are no errors on the
  // validation or duplicate side, then an Airtable record is created.
  async handleSubmit() {
    const phoneNumberError = validate('phoneNumber', this.state.phoneNumber);
    const passwordError = validate('password', this.state.password);
    let nameError = '';
    if (!this.state.firstName || !this.state.lastName) {
      nameError = 'Name inputs cannot be blank.';
    }
    // In case we want to do name checking using validate.js
    // const nameError = validate('name', this.state.firstName)

    let formattedPhoneNumber = this.state.phoneNumber;
    // eslint-disable-next-line prettier/prettier
    formattedPhoneNumber = `(${formattedPhoneNumber.slice(
      0,
      3
    )}) ${formattedPhoneNumber.slice(3, 6)}-${formattedPhoneNumber.slice(
      6,
      10
    )}`;

    // Have to await this or else Airtable call may happen first
    await this.setState({
      nameError,
      phoneNumberError,
      passwordError
    });

    // If we don't have any bugs already with form validation,
    // we'll check for duplicates here in the Airtable.
    if (!phoneNumberError) {
      const that = this;
      await checkForDuplicateCustomer(formattedPhoneNumber).then(
        async resolvedValue => {
          if (resolvedValue) {
            // Again, must await this
            await that.setState({
              phoneNumberError: 'Phone number in use already.'
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
            firstName: '',
            lastName: '',
            password: '',
            passwordError: '',
            phoneNumber: '',
            phoneNumberError: '',
            token: '',
            id: custId
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

  render() {
    return (
      <SignUpContainer>
        <Input
          placeholder="First Name"
          onChangeText={text => this.setState({ firstName: text })}
          value={this.state.firstName}
        />
        <Input
          placeholder="Last Name"
          onChangeText={text => this.setState({ lastName: text })}
          value={this.state.lastName}
        />
        <Input
          placeholder="Phone Number"
          onChangeText={text => this.setState({ phoneNumber: text })}
          value={this.state.phoneNumber}
          keyboardType="number-pad"
          maxLength={10}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
        />
        <Button title="Sign Up" onPress={() => this.handleSubmit()} />
        <Button
          title="Already have an account? Log in"
          onPress={() => this.props.navigation.navigate('Login')}
        />
        <Button title="Testing Bypass" onPress={() => this._devBypass()} />
      </SignUpContainer>
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

// For handling errors within the form. This is strecth to handle the
// onBlur thing that I talked about.
const TextField = props => (
  <View>
    <TextInput
      style={props.style}
      placeholder={props.placeholder}
      secureTextEntry={props.secureTextEntry}
    />
    <TextInput value={props.error ? <Text>{props.error}</Text> : null} />
  </View>
);

// For future use, to match for better passwords
// TODO: @Johnathan Fix passwords check
const pattern = '((?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[W]).{6,20})';

// This is to create constraints for the validatejs library
const validation = {
  name: {
    presence: {
      message: 'Name inputs cannot be blank.'
    }
  },
  phoneNumber: {
    // This verifies that it's not blank.
    presence: {
      message: "^Phone number can't be blank."
    },
    length: {
      is: 10,
      message: '^Please enter a valid phone number.'
    }
    // To check for only numbers in the future
    // format: {
    //   pattern: "/^\d+$/",
    //   message: "Phone number cannot contain nondigits."
    // }
  },

  password: {
    presence: {
      message: '^Password cannot be blank.'
    },
    length: {
      minimum: 8,
      message: '^Your password must be at least 8 characters.'
    }
    // For future use for better password checking
    // format: {
    //   pattern: "[a-z0-9]+",
    //   flags: "i",
    //   message: "Must contain at least one digit, one lowercase number, and special chracter"
    // }
  }
};

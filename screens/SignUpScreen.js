/* eslint-disable react/destructuring-assignment */
import { Notifications } from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import React from 'react';
import {
  AsyncStorage,
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import validatejs from 'validate.js';

// I abstracted portions of the validation flow into these files
// but there's a weird bug "https://github.com/facebook/react-native/issues/4968"
// so I put it all in this one file.
// TODO: @Johnathan Abstract everything in to separate files
// TODO: @Johnathan Refactor Airtable calls

// import { MonoText } from 'screens/signup/textfield.jsx'
// import validation from  'screens/signup/validation'
// import validate from  'screens/signup/validation_wrapper'

import BASE from '../lib/common';

export default class SignUp extends React.Component {

  // Helper function for adding a new customer
  static async createPushToken(token) {
    return new Promise((resolve, reject) => {
      BASE('Push Tokens').create(
        [
          {
            fields: {
              Token: token
            }
          }
        ],
        // eslint-disable-next-line func-names
        function (err, records) {
          if (err) {
            console.error(err);
            return;
          }
          // eslint-disable-next-line func-names
          records.forEach(function(record) {
            // Sanity-check by printing token (string) value
            const data = record.fields;
            console.log(data.Token);

            // Resolve with tokenId for use in other functions
            const tokenId = record.getId();
            console.log(tokenId);

            resolve(tokenId);
          });
        }
      );
    });
  }

  // Helper function for adding a new customer
  static async createCustomer(fName, lName, phoneNumber, password, tokenId) {
    return new Promise((resolve, reject) => {
      BASE('Customers').create(
        [
          {
            fields: {
              'First Name': fName,
              'Last Name': lName,
              'Phone Number': phoneNumber,
              Password: password,
              Points: 0,
              'Push Tokens': [tokenId]
            }
          }
        ],
        function (err, records) {
          if (err) {
            console.error(err);
            return;
          }
          records.forEach(function (record) {
            // Prints when you add for now,
            // not sure what else we should be doing here.
            custId = record.getId();
            console.log(custId);

            // Resolve with custId for use in other functions
            resolve(custId);
          });
        }
      );
    });
  }

  // This function checks the customers table for any duplicates
  // based on the phone number. It returns a promise because
  // the Airtable API call is an async function.
  static async checkForDuplicates(phoneNumber) {
    return new Promise((resolve, reject) => {
      const duplicate = false;
      BASE('Customers')
        .select({
          maxRecords: 1,
          filterByFormula: `SEARCH("${phoneNumber}", {Phone Number})`
        })
        .eachPage(
          function page(records, fetchNextPage) {
            if (records.length > 0) {
              resolve(true);
            } else {
              resolve(false);
            }
            fetchNextPage();
          },
          err => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              resolve(duplicate);
            }
          }
        );
    });
  }

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

  // Helper function for adding customers to the database. Takes
  // in all the relevant information from the form and calls the
  // Airtable API to create the record.
  async addCustomer() {
    return new Promise((resolve, reject) => {
      SignUp.createPushToken(this.state.token).then(tokenId =>
        SignUp.createCustomer(
          this.state.firstName,
          this.state.lastName,
          this.state.phoneNumber,
          this.state.password,
          tokenId
        ).then(custId => {
          console.log(custId);
          resolve(custId);
        })
      );
    });
  }

  // Handling submission. This function runs the validation functions
  // as well as the duplicate checking. If there are no errors on the
  // validation or duplicate side, then an Airtable record is created.
  async handleSubmit() {
    let phoneNumberError = validate('phoneNumber', this.state.phoneNumber);
    const passwordError = validate('password', this.state.password);
    let nameError = '';
    if (!this.state.firstName || !this.state.lastName) {
      nameError = 'Name inputs cannot be blank.';
    }
    // In case we want to do name checking using validate.js
    // const nameError = validate('name', this.state.firstName)

    let formattedPhoneNumber = this.state.phoneNumber;
    formattedPhoneNumber = `(${formattedPhoneNumber.slice(
      0,
      3
    )}) ${formattedPhoneNumber.slice(3, 6)}-${formattedPhoneNumber.slice(
      6,
      10
    )}`;

    // If we don't have any bugs already with form validation,
    // we'll check for duplicates here in the Airtable.
    if (!phoneNumberError) {
      SignUp.checkForDuplicates(formattedPhoneNumber).then(
        resolvedValue => {
          if (resolvedValue) {
            phoneNumberError = 'Phone number in use already.';
          }
        },
        error => {
          console.error(error);
        }
      );
    }

    var errorMessage =
      nameError + '\n' + phoneNumberError + '\n' + passwordError;

    this.setState({
      nameError,
      phoneNumberError,
      passwordError
    });

    if (
      !nameError &&
      !this.state.phoneNumberError &&
      !this.state.passwordError
    ) {
      this.addCustomer()
        .then(data => {
          this.setState({
            firstName: '',
            lastName: '',
            password: '',
            passwordError: '',
            phoneNumber: '',
            phoneNumberError: '',
            token: '',
            id: data
          });
          this._asyncSignin();
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      // For now it just tells you what you did wrong -- stretch
      // is to make it update onBlur() -- code is below for it.
      alert(errorMessage);
    }
    Keyboard.dismiss();
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          onChangeText={text => this.setState({ firstName: text })}
          value={this.state.firstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          onChangeText={text => this.setState({ lastName: text })}
          value={this.state.lastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          onChangeText={text => this.setState({ phoneNumber: text })}
          value={this.state.phoneNumber}
          keyboardType="number-pad"
          maxLength={10}
          // For future use to make forms even nicer
          // TODO: @Johnathan Figure out onBlur
          // onChangeText={(text) => this.setState({phoneNumber:text.trim()})}
          // error={this.state.phoneNumberError}
          // onBlur={() => {
          //   this.setState({
          //     phoneNumberError: validate('phoneNumber', this.state.phoneNumber)
          //   })
          // }}
        />
        <TextInput
          style={styles.input}
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
      </View>
    );
  }
}

// This is the validate function that utilizes validate.js
// to check a fieldname based on an inputted value.
function validate(fieldName, value) {
  // Validate.js validates your values as an object
  // e.g. var form = {email: 'email@example.com'}
  // Line 8-9 creates an object based on the field name and field value
  let values = {};
  values[fieldName] = value;

  let constraints = {};
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
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
  }
});

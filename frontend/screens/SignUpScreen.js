import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import Airtable from 'airtable'
const base = new Airtable({ apiKey: AIRTABLE_API_KEY}).base(
  "app4fXK49bqcjDMEo"
);

import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import validatejs from 'validate.js'

// import { TextField } from 'screens/signup/textfield.jsx'
// import validation from  'screens/signup/validation'
// import validate from  'screens/signup/validation_wrapper'
 


import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage,
  Keyboard
} from 'react-native';

import { MonoText } from '../components/StyledText';

export default class SignUp extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      nameError: '', 
      password: '',
      passwordError: '',
      phoneNumber: '',
      phoneNumberError: '',
      pushToken: ''
    }
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
      let token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
      this.setState({"pushToken": token})
    } else {
      alert('Must use physical device for Push Notifications');
    }
  };

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

  async handleSubmit() {
    let phoneNumberError = validate('phoneNumber', this.state.phoneNumber)
    const passwordError = validate('password', this.state.password)
    var nameError = ""
    if (!this.state.firstName || !this.state.lastName) {
      nameError = "Name inputs cannot be blank."
    } 

    // In case we want to do name checking
    // const nameError = validate('name', this.state.firstName)

    console.log('name error: ', nameError)
    console.log('password error: ', passwordError)
    console.log('phonenumber error: ', phoneNumberError)
    
    let formatted_phone_number = this.state.phoneNumber
    formatted_phone_number = "(" +  formatted_phone_number.slice(0, 3) + ") " + formatted_phone_number.slice(3, 6) + "-" + formatted_phone_number.slice(6, 10)
    console.log(formatted_phone_number)

    if (!phoneNumberError) { 
      await this.checkForDuplicates(formatted_phone_number)
        .then(resolvedValue => {
          if (resolvedValue) {
            phoneNumberError = "Phone number in use already."
            console.log("THIS IS PHONE NUMBER ERROR", phoneNumberError)
            
          } 
        }, (error) => {
          console.log(error)
        })
    }
    console.log("THIS IS PHONE NUMBER ERROR", phoneNumberError)
    this.setState({
      nameError: nameError,
      phoneNumberError: phoneNumberError,
      passwordError: passwordError
    })
    console.log(this.state.phoneNumberError)
    // base("Customers").select({
    //   maxRecords: 1,
    //   filterByFormula: `SEARCH("${formatted_phone_number}", {Phone Number})`
    //   // `SEARCH({Name} = ${this.state.firstName} ${this.state.lastName}`
    // }).eachPage(function page(records, fetchNextPage) {
    //     // This function (`page`) will get called for each page of records.
    //     if(records.length > 0) {
    //       // console.log("ENTIRE THING", records)
    //       console.log("1 ", records[0].get("Name"))
    //       console.log("Duplicate found.")
    //       phoneNumberError = records[0].get("Name")
    //     } else {
    //       console.log("nothing found but query ran")
    //     }
    // }, function done(err) {
    //     if (err) { console.error(err); return; }
    // });
   

    var errorMessage = nameError + "\n" + phoneNumberError + "\n" + passwordError 
    
    if (!nameError && !this.state.phoneNumberError && !this.state.passwordError) {
      this.addCustomer(this.state.firstName, this.state.lastName, this.state.phoneNumber, this.state.password, this.state.pushToken);
      this.setState({
        firstName: '',
        lastName: '',
        password: '',
        phoneNumber: '',
        pushToken: ''
      })
      // this._asyncSignin()
    } else {
      alert(errorMessage)
      console.log("form error")
    }
    Keyboard.dismiss()
  }

  addCustomer(fname, lname, phoneNumber, password, pushToken) {
    base("Customers").create(
      [
        {
          fields: {
            "First Name": fname,
            "Last Name": lname,
            "Phone Number": phoneNumber,
            "Password": password,
            "Points": 0,
            "Push Token": pushToken,
          }
        }
      ],
      function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
        records.forEach(function(record) {
          console.log(record.getId());
        });
      }
    );
  }

  async checkForDuplicates(phoneNumber) {
    console.log("we about to check in airtable")
    console.log(phoneNumber)
    return new Promise((resolve, reject) => {
      let duplicate = false
      base("Customers").select({
        maxRecords: 1,
        filterByFormula: `SEARCH("${phoneNumber}", {Phone Number})`
      }).eachPage(function page(records, fetchNextPage) {
          if(records.length > 0) {
            console.log("1 ", records[0].get("Name"))
            console.log("IF THIS PRINTS I SHOULD NOT LOG IN")
            resolve(true)
          } else {
            resolve(false)
          }
          fetchNextPage();
      }, (err) => {
          if (err) { 
            console.error(err)
            reject(err)
          } else {
            resolve(duplicate)
          }
      });
    })

    // airtableAsync.then((resolvedValue) => {
    //   if (resolvedValue) {
    //     this.setState({"phoneNumberError": "Phone number in use already."})
    //     console.log("THIS IS PHONE NUMBER ERROR", phoneNumber)
    //   } 
    // }, (error) => {
    //   console.log(error)
    // })
  }

  _asyncSignin = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          onChangeText={(text) => this.setState({firstName:text})}
          value={this.state.firstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          onChangeText={(text) => this.setState({lastName:text})}
          value={this.state.lastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          onChangeText={(text) => this.setState({phoneNumber:text})}
          value={this.state.phoneNumber}
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
          secureTextEntry={true}
          onChangeText={(text) => this.setState({password:text})}
          value={this.state.password}
          // onChangeText={value => this.setState({password: value.trim()})}
          // onBlur={() => {
          //   this.setState({
          //     passwordError: validate('password', this.state.password)
          //   })
          // }}
          // error={this.state.passwordError}
        />
        <Button
          title="Sign Up"
          onPress={() => 
            this.handleSubmit()
          }
        />
      </View>
    );
  }
}

function validate(fieldName, value) {
  // Validate.js validates your values as an object
  // e.g. var form = {email: 'email@example.com'}
  // Line 8-9 creates an object based on the field name and field value
  var values = {}
  values[fieldName] = value

  var constraints = {}
  constraints[fieldName] = validation[fieldName]
  // The values and validated against the constraints
  // the variable result hold the error messages of the field
  const result = validatejs(values, constraints)
  // If there is an error message, return it!
  if (result) {
    // Return only the field error message if there are multiple
    return result[fieldName][0]
  }
  return ""
}

// For handling errors within the form
const TextField = props => (
  <View>
    <TextInput
      style= {props.style}
      placeholder = {props.placeholder}
      secureTextEntry={props.secureTextEntry}
    />
    <TextInput
      value = {props.error ? <Text>{props.error}</Text> : null}
    />
  </View>
)

// For future use, to match for better passwords
var pattern = "((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})"

// This is to create constraints for the validatejs library 
const validation = {
  name: {
    presence: {
      message: "Name inputs cannot be blank."
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
    },
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
    },
    // For future use for better password checking
    // format: {
    //   pattern: "[a-z0-9]+",
    //   flags: "i",
    //   message: "Must contain at least one digit, one lowercase number, and special chracter"
    // }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    fontWeight: '500',
  },
});

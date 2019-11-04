import React from 'react';
import { AsyncStorage, Button, StyleSheet, Text, TextInput, View } from 'react-native';

import { BASE } from '../lib/common';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: '',
      password: '',
      userDisplay: ''
    };
  }

  // lookupCustomer searches for users based on their
  // phone numbers in the form (XXX) XXX-XXXX and checks against
  // a correct password. If the user is found, we return their first
  // and last name. Otherwise, we will display an error on the login screen.
  async lookupCustomer(phone_number, password) {
    return new Promise((resolve, reject) => {
      BASE('Customers')
        .select({
          maxRecords: 1,
          filterByFormula:
            `AND({Phone Number} = '${ 
            phone_number 
            }', {Password} = '${ 
            password 
            }')`
        })
        .eachPage(
          function page(records, fetchNextPage) {
            if (records.length == 0) {
              reject('Incorrect phone number or password. Please try again.');
            } else {
              records.forEach(function(record) {
                resolve(record.getId());
              });
            }
            fetchNextPage();
          },
          function done(err) {
            if (err) {
              reject(err);
            }
          }
        );
    });
  }

  // From SignUpScreen. Sign in function. It sets the user token in local storage
  // to be the fname + lname and then navigates to homescreen.
  _asyncSignin = async (userId) => {
    await AsyncStorage.setItem('userId', userId);
    console.log(userId)
    this.props.navigation.navigate('App');
  };

  // This function will reformat the phone number to (XXX) XXX-XXXX and sign the user in if
  // the user is found.
  async handleSubmit() {
    let formatted_phone_number = this.state.phoneNumber;
    formatted_phone_number = formatted_phone_number.replace('[^0-9]', '');
    formatted_phone_number =
      `(${ 
      formatted_phone_number.slice(0, 3) 
      }) ${ 
      formatted_phone_number.slice(3, 6) 
      }-${ 
      formatted_phone_number.slice(6, 10)}`;

    await this.lookupCustomer(formatted_phone_number, this.state.password)
      .then(resp => {
        if (resp) {
          this._asyncSignin(resp);
          this.setState({ userDisplay: resp, phoneNumber: '', password: '' });
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

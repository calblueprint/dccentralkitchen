import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import Airtable from 'airtable'
const base = new Airtable({ apiKey: AIRTABLE_API_KEY}).base(
  "app4fXK49bqcjDMEo"
);

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage
} from 'react-native';

import { MonoText } from '../components/StyledText';

export default class SignUp extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      password: '',
      phoneNumber: ''
    }
  }

  handleSubmit() {
    addCustomer(this.state.firstName, this.state.lastName, this.state.phoneNumber, this.state.password);
    this.setState({
      firstName: '',
      lastName: '',
      password: '',
      phoneNumber: ''
    })
    this._asyncSignin()
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
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({password:text})}
          value={this.state.password}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          onChangeText={(text) => this.setState({phoneNumber:text})}
          value={this.state.phoneNumber}
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

function addCustomer(fname, lname, phone_number, password) {
  base("Customers").create(
    [
      {
        fields: {
          "First Name": fname,
          "Last Name": lname,
          "Phone Number": phone_number,
          Password: password,
          Points: 0
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

import React from 'react';
import Airtable from 'airtable'
const base = new Airtable({ apiKey: "keynZcXTqJXwkNhS0"}).base(
  "app4fXK49bqcjDMEo"
);

import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text
} from 'react-native';

export default class Login extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      phoneNumber: '',
      password: '',
      userDisplay: '',
    }
  }

  async lookupCustomer(phone_number, password) {
    return new Promise((resolve, reject) => {
      base("Customers").select({
        maxRecords: 1,
        filterByFormula: "AND({Phone Number} = '" + phone_number + "', {Password} = '" + password + "')"
      }).eachPage(function page(records, fetchNextPage) {
        if (records.length == 0) {
          resolve("Incorrect phone number or password. Please try again.");
        } else {
          records.forEach(function(record) {
            resolve('Logged in as ' + record.get('Name'));
          });
        }
        fetchNextPage();
      }, function done(err) {
        if (err) {
          reject(err);
        }
      });
    });
  }

  async handleSubmit() {
    await this.lookupCustomer(this.state.phoneNumber, this.state.password).then((resp) => {
      if (resp) {
        this.setState({userDisplay: resp, phoneNumber: '', password: ''});
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={this.state.phoneNumber}
          onChangeText={(text) => this.setState({phoneNumber:text})}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({password:text})}
          value={this.state.password}
        />
        <Button
          title="Log In"
          onPress={() => 
            this.handleSubmit()
          }
        />
        <Text
          style={styles.text}
        >
          {this.state.userDisplay}
        </Text>
      </View>
    );
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
  text: {
    fontSize: 14,
    textAlign: 'center',
  }
});

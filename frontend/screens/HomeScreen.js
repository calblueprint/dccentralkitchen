import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import Airtable from 'airtable'
const base = new Airtable({ apiKey: "AIRTABLE_API_KEY" }).base(
  "app4fXK49bqcjDMEo"
);

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button
} from 'react-native';

import { MonoText } from '../components/StyledText';

export default class SignUp extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Username'
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
        />
      </View>
    );
  }
}

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
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

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
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

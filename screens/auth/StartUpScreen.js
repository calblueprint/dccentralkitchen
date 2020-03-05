import { Notifications } from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import React from 'react';
import { AsyncStorage, Button, Text, TextInput, View } from 'react-native';

import { ErrorMsg, Input, StartUpContainer } from '../../styled/auth';
import { BigTitle } from '../../components/BaseComponents';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: '',
      password: '',
      errorMsg: '',
      token: null
    };
  }

  componentDidMount() {}

  render() {
    return (
      <StartUpContainer>
        <BigTitle>Welcome to Healthy Corners!</BigTitle>
      </StartUpContainer>
    );
  }
}

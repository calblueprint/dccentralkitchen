import { Notifications } from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import React from 'react';
import { AsyncStorage, Button, Text, TextInput, View } from 'react-native';
import Colors from '../../assets/Colors';
import {
  BigTitle,
  ButtonLabel,
  FilledButtonContainer
} from '../../components/BaseComponents';
import {
  StartUpContainer,
  StartUpTitleContainer,
  StartUpButtonContainer
} from '../../styled/auth';

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
        <StartUpTitleContainer>
          <BigTitle align="center">Welcome to Healthy Corners!</BigTitle>
        </StartUpTitleContainer>
        <StartUpButtonContainer>
          <FilledButtonContainer width="291px">
            <ButtonLabel color="white">SIGN UP</ButtonLabel>
          </FilledButtonContainer>
        </StartUpButtonContainer>
      </StartUpContainer>
    );
  }
}

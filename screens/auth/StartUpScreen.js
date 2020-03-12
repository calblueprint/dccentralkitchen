import { Notifications } from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import React from 'react';
import { AsyncStorage, Button, Text, TextInput, View } from 'react-native';
import Colors from '../../assets/Colors';
import {
  BigTitle,
  Body,
  ButtonLabel,
  ButtonContainer,
  FilledButtonContainer
} from '../../components/BaseComponents';
import {
  StartUpContainer,
  StartUpTitleContainer,
  StartUpLoginContainer
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

  navigateLogin() {
    this.props.navigation.navigate('Login');
  }

  navigateSignup() {
    this.props.navigation.navigate('SignUp');
  }

  render() {
    return (
      <StartUpContainer>
        <StartUpTitleContainer>
          <BigTitle align="center">Welcome to Healthy Corners!</BigTitle>
        </StartUpTitleContainer>
        <FilledButtonContainer
          style={{ marginTop: 108 }}
          width="100%"
          onPress={() => this.navigateSignup()}>
          <ButtonLabel color="white">SIGN UP</ButtonLabel>
        </FilledButtonContainer>
        <StartUpLoginContainer>
          <Body color={Colors.secondaryText}>Already have an account?</Body>
          <ButtonContainer onPress={() => this.navigateLogin()}>
            <ButtonLabel color={Colors.primaryGreen}>Log in</ButtonLabel>
          </ButtonContainer>
        </StartUpLoginContainer>
      </StartUpContainer>
    );
  }
}

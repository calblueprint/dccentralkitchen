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
  FilledButtonContainer,
} from '../../components/BaseComponents';
import {
  WelcomeContainer,
  WelcomeTitleContainer,
  WelcomeLoginContainer,
} from '../../styled/auth';

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: '',
      password: '',
      errorMsg: '',
      token: null,
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
      <WelcomeContainer>
        <WelcomeTitleContainer>
          <BigTitle align="center">Welcome to Healthy Corners!</BigTitle>
        </WelcomeTitleContainer>
        <FilledButtonContainer
          style={{ marginTop: 108 }}
          width="100%"
          onPress={() => this.navigateSignup()}>
          <ButtonLabel color="white">Sign up</ButtonLabel>
        </FilledButtonContainer>
        <WelcomeLoginContainer>
          <Body color={Colors.secondaryText}>Already have an account?</Body>
          <ButtonContainer onPress={() => this.navigateLogin()}>
            <ButtonLabel color={Colors.primaryGreen}>Log in</ButtonLabel>
          </ButtonContainer>
        </WelcomeLoginContainer>
      </WelcomeContainer>
    );
  }
}

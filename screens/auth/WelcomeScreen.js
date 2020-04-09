import React from 'react';
import { AsyncStorage } from 'react-native';
import {
  BigTitle,
  ButtonContainer,
  ButtonLabel,
  FilledButtonContainer,
} from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
import { WelcomeContainer, WelcomeTitleContainer } from '../../styled/auth';

export default class WelcomeScreen extends React.Component {
  navigateLogIn() {
    this.props.navigation.navigate('LogIn');
  }

  navigateSignup() {
    this.props.navigation.navigate('SignUp');
  }

  guestLogin = async () => {
    // Doesn't enforce any resolution for this async call
    await AsyncStorage.setItem('userId', 'recLKK7cZHboMPEB8');
    this.props.navigation.navigate('App');
  };

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
        <FilledButtonContainer
          style={{ marginTop: 12 }}
          color={Colors.lighterGreen}
          width="100%"
          onPress={() => this.navigateLogIn()}>
          <ButtonLabel color="white">Log In</ButtonLabel>
        </FilledButtonContainer>

        <ButtonContainer
          style={{ marginTop: 12, textTransform: 'capitalize' }}
          onPress={() => this.guestLogin()}>
          <ButtonLabel
            style={{ textTransform: 'none' }}
            color={Colors.primaryGreen}>
            Continue without an account
          </ButtonLabel>
        </ButtonContainer>
      </WelcomeContainer>
    );
  }
}

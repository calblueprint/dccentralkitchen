import React from 'react';
import { Image } from 'react-native';
import {
  Body,
  ButtonContainer,
  ButtonLabel,
  FilledButtonContainer,
} from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
import { WelcomeContainer, WelcomeLogInContainer } from '../../styled/auth';

export default class WelcomeScreen extends React.Component {
  navigateLogIn() {
    this.props.navigation.navigate('LogIn');
  }

  navigateSignup() {
    this.props.navigation.navigate('SignUp');
  }

  render() {
    return (
      <WelcomeContainer>
        {/* <WelcomeTitleContainer> */}
        <Image
          source={require('../../assets/images/hc_start.png')}
          style={{
            maxWidth: '100%',
            resizeMode: 'contain',
            maxHeight: 400,
          }}
        />
        <FilledButtonContainer
          style={{ marginTop: 108 }}
          width="100%"
          onPress={() => this.navigateSignup()}>
          <ButtonLabel color="white">Sign up</ButtonLabel>
        </FilledButtonContainer>
        <WelcomeLogInContainer>
          <Body color={Colors.secondaryText}>Already have an account?</Body>
          <ButtonContainer onPress={() => this.navigateLogIn()}>
            <ButtonLabel color={Colors.primaryGreen}>Log In</ButtonLabel>
          </ButtonContainer>
        </WelcomeLogInContainer>
      </WelcomeContainer>
    );
  }
}

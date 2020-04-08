import PropTypes from 'prop-types';
import React from 'react';
import { AsyncStorage, Image } from 'react-native';
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

  guestLogin = async () => {
    // Doesn't enforce any resolution for this async call
    await AsyncStorage.setItem('userId', 'recLKK7cZHboMPEB8');
    this.props.navigation.navigate('App');
  };

  render() {
    return (
      <WelcomeContainer>
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
        <WelcomeLogInContainer>
          <Body color={Colors.secondaryText}>No account yet?</Body>
          <ButtonContainer onPress={() => this.guestLogin()}>
            <ButtonLabel color={Colors.primaryGreen}>
              Continue as Guest
            </ButtonLabel>
          </ButtonContainer>
        </WelcomeLogInContainer>
      </WelcomeContainer>
    );
  }
}

WelcomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

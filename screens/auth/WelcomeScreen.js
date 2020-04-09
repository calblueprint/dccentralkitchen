import PropTypes from 'prop-types';
import React from 'react';
import { AsyncStorage, Image } from 'react-native';
import {
<<<<<<< HEAD
  Body,
=======
  BigTitle,
>>>>>>> restyled, added footer
  ButtonContainer,
  ButtonLabel,
  FilledButtonContainer,
} from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
<<<<<<< HEAD
import { WelcomeContainer, WelcomeLogInContainer } from '../../styled/auth';
=======
import { WelcomeContainer, WelcomeTitleContainer } from '../../styled/auth';
>>>>>>> restyled, added footer

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

WelcomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

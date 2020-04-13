import PropTypes from 'prop-types';
import React from 'react';
import {
  BigTitle,
  Body,
  ButtonContainer,
  ButtonLabel,
  FilledButtonContainer,
} from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
import {
  WelcomeContainer,
  WelcomeLogInContainer,
  WelcomeTitleContainer,
} from '../../styled/auth';

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
        <WelcomeTitleContainer>
          <BigTitle align="center">Welcome to Healthy Corners!</BigTitle>
        </WelcomeTitleContainer>
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

WelcomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

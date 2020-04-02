import React from 'react';
import { AsyncStorage } from 'react-native';
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
  WelcomeLoginContainer,
  WelcomeTitleContainer,
} from '../../styled/auth';

export default class WelcomeScreen extends React.Component {
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

  // Signs into Guest account, phone number ########## on Airtable
  guestLogin = async () => {
    // Doesn't enforce any resolution for this async call
    await AsyncStorage.setItem('userId', 'recxEGfvExP4Dv8nr');
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
        <WelcomeLoginContainer>
          <Body color={Colors.secondaryText}>Already have an account?</Body>
          <ButtonContainer onPress={() => this.navigateLogin()}>
            <ButtonLabel color={Colors.primaryGreen}>Log in</ButtonLabel>
          </ButtonContainer>
        </WelcomeLoginContainer>
        <WelcomeLoginContainer>
          <Body color={Colors.secondaryText}>Filler Text</Body>
          <ButtonContainer onPress={() => this.guestLogin()}>
            <ButtonLabel color={Colors.primaryGreen}>
              Continue as Guest
            </ButtonLabel>
          </ButtonContainer>
        </WelcomeLoginContainer>
      </WelcomeContainer>
    );
  }
}

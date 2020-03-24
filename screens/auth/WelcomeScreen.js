import React from 'react';
import Colors from '../../assets/Colors';
import {
  BigTitle,
  Body,
  ButtonContainer,
  ButtonLabel,
  FilledButtonContainer
} from '../../components/BaseComponents';
import {
  WelcomeContainer,
  WelcomeLoginContainer,
  WelcomeTitleContainer
} from '../../styled/auth';

export default class WelcomeScreen extends React.Component {
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
WelcomeScreen.navigationOptions = {
  headerShown: false
};

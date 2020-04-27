import PropTypes from 'prop-types';
import React from 'react';
import { AsyncStorage, Image } from 'react-native';
import {
  ButtonContainer,
  ButtonLabel,
  FilledButtonContainer,
} from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
import RecordIds from '../../constants/RecordIds';
import { WelcomeContainer } from '../../styled/auth';

export default class WelcomeScreen extends React.Component {
  guestLogin = async () => {
    await AsyncStorage.setItem('customerId', RecordIds.guestCustomerId);
    this.props.navigation.navigate('App');
  };

  navigateSignup() {
    this.props.navigation.navigate('SignUp');
  }

  navigateLogIn() {
    this.props.navigation.navigate('LogIn');
  }

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
          style={{ marginTop: 4, padding: 12 }}
          onPress={async () => this.guestLogin()}>
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

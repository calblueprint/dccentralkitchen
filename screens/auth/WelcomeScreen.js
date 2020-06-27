import Constants from 'expo-constants';
import * as Analytics from 'expo-firebase-analytics';
import PropTypes from 'prop-types';
import React from 'react';
import { AsyncStorage, Image, View } from 'react-native';
import {
  Body,
  ButtonContainer,
  ButtonLabel,
  FilledButtonContainer,
} from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
import RecordIds from '../../constants/RecordIds';
import { WelcomeContainer } from '../../styled/auth';
import { RowContainer } from '../../styled/shared';

export default class WelcomeScreen extends React.Component {
  guestLogin = async () => {
    await AsyncStorage.setItem('customerId', RecordIds.guestCustomerId);
    Analytics.logEvent('guest_login_complete', {
      installation_id: Constants.installationId,
    });
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
        {/* Welcome Image */}
        <View
          style={{
            height: '60%',
            justifyContent: 'flex-end',
          }}>
          <Image
            source={require('../../assets/images/hc_start.png')}
            style={{
              maxWidth: '100%',
              resizeMode: 'contain',
              maxHeight: 400,
            }}
          />
        </View>
        {/* Buttons */}
        <View style={{ width: '100%' }}>
          <FilledButtonContainer
            style={{ marginTop: 12 }}
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
            <ButtonLabel noCaps color={Colors.primaryGreen}>
              Continue as guest
            </ButtonLabel>
          </ButtonContainer>
          <RowContainer
            style={{
              marginTop: 14,
              padding: 12,
              justifyContent: 'center',
            }}>
            <Body>Registered in person? </Body>
            <ButtonContainer
              onPress={() =>
                this.props.navigation.navigate('Reset', { forgot: false })
              }>
              <ButtonLabel noCaps color={Colors.primaryGreen}>
                Set a password
              </ButtonLabel>
            </ButtonContainer>
          </RowContainer>
        </View>
      </WelcomeContainer>
    );
  }
}

WelcomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

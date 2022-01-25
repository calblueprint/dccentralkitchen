/* eslint-disable no-unused-expressions */
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import React from 'react';

// TODO: combine with AuthLoading?
export default class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const jsonValue = await AsyncStorage.getItem('customerId');
    const userToken = jsonValue != null ? JSON.parse(jsonValue) : null;

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.

    // Correct version

    userToken
      ? this.props.navigation.navigate('App')
      : this.props.navigation.navigate('Auth');

    // Auth/App testing purpose
    // this.props.navigation.navigate('Auth');
    // this.props.navigation.navigate('App');
  };

  // Render any loading content that you like here
  render() {
    return null;
  }
}

AuthLoadingScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

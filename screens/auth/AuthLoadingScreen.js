import AsyncStorage from '@react-native-community/async-storage';
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
    const userToken = await AsyncStorage.getItem('customerId');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.

    // Correct version
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');

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

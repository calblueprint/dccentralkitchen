import React from 'react';
import { AsyncStorage } from 'react-native';

// TODO: combine with AuthLoading?
export default class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userId');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.

    // Correct version
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');

    // Auth testing purpose
    // this.props.navigation.navigate('Auth');
  };

  // Render any loading content that you like here
  render() {
    return null;
  }
}

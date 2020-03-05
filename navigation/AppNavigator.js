import React from 'react';
import { AsyncStorage } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { createDrawerNavigator } from 'react-navigation-drawer';
import StartUpScreen from '../screens/auth/StartUpScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignInScreen from '../screens/auth/SignUpScreen';

import { StoresStack, RewardsStack, AnnounceStack } from './StackNavigators';

// TODO @JohnathanZhou should be either SignUpScreen or SignInScreen for consistency?
const AuthStack = createStackNavigator({
  StartUp: StartUpScreen,
  SignIn: SignInScreen,
  Login: LoginScreen
});

class AuthLoadingScreen extends React.Component {
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
    // this.props.navigation.navigate(userToken ? 'App' : 'Auth');

    // Testing purpose
    this.props.navigation.navigate('Auth');
  };

  // Render any loading content that you like here
  render() {
    return null;
  }
}

const MyDrawerNavigator = createDrawerNavigator({
  Stores: {
    screen: StoresStack,
    navigationOptions: () => ({
      title: 'Stores'
    })
  },
  Rewards: {
    screen: RewardsStack,
    navigationOptions: () => ({
      title: 'Your Profile',
      drawerLockMode: 'locked-closed'
    })
  },
  // TODO change the name of Announcements to News (?) across app & Airtable
  Announcements: {
    screen: AnnounceStack,
    navigationOptions: () => ({
      title: 'News'
    })
  }
});

export default createAppContainer(
  createSwitchNavigator(
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    {
      AuthLoading: AuthLoadingScreen,
      App: {
        screen: MyDrawerNavigator
      },
      Auth: AuthStack
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
);

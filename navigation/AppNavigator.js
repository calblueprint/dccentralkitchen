import React from 'react';
import { AsyncStorage, View, TouchableOpacity, Linking } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import Title from '../components/BaseComponents';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import {
  NewsStack,
  RewardsStack,
  StoresStack,
  ResourcesStack
} from './StackNavigators';

const AuthStack = createStackNavigator({
  SignUp: SignUpScreen,
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
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return null;
  }
}

class DrawerContent extends React.Component {
  constructor() {
    super();
  }

  _logout = async () => {
    AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
  render() {
    return (
      <View>
        <View
          style={{
            backgroundColor: Colors.black,
            height: 114,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            padding: 16
          }}>
          <Title style={{ color: 'white' }}>Gregory Gaby</Title>
        </View>
        <DrawerItems {...this.props} />
        <View
          style={{
            padding: 16,
            verticalAlign: 'bottom'
          }}>
          <TouchableOpacity
            onPress={() => Linking.openURL('http://www.example.com/')}>
            <Title>Report Issue</Title>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._logout()}>
            <Title>Logout</Title>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const MyDrawerNavigator = createDrawerNavigator(
  {
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
    News: {
      screen: NewsStack,
      navigationOptions: () => ({
        title: 'News'
      })
    },
    Resources: {
      screen: ResourcesStack,
      navigationOptions: () => ({
        title: 'Resources'
      })
    }
  },
  {
    contentComponent: DrawerContent
  }
);

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

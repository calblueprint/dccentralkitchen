import React from 'react';
import { AsyncStorage } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Colors from '../constants/Colors';
import RewardsScreen from '../screens/rewards/RewardsScreen';
import DrawerContent from './DrawerContent';
import {
  AuthStack,
  ResourcesStack,
  RootStack,
  StoresStack,
} from './StackNavigators';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
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

const MyDrawerNavigator = createDrawerNavigator(
  {
    Root: {
      screen: RootStack,
      navigationOptions: () => ({
        title: 'Root',
        drawerLabel: () => null,
      }),
    },
    Stores: {
      screen: StoresStack,
      navigationOptions: () => ({
        title: 'Stores',
      }),
    },
    Rewards: {
      screen: props => <RewardsScreen {...props} tab={1} />,
      navigationOptions: () => ({
        title: 'Points History',
        drawerLockMode: 'locked-closed',
      }),
    },
    Resources: {
      screen: ResourcesStack,
      navigationOptions: () => ({
        title: 'Resources',
      }),
    },
  },

  {
    contentOptions: {
      labelStyle: {
        fontFamily: 'poppins-medium',
        fontSize: 20,
      },
      activeTintColor: Colors.primaryGreen,
    },
    drawerWidth: 189,
    contentComponent: DrawerContent,
  }
);

export default createAppContainer(
  createSwitchNavigator(
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    {
      AuthLoading: AuthLoadingScreen,
      App: {
        screen: MyDrawerNavigator,
      },
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);

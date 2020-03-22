import React from 'react';
import { AsyncStorage, View, TouchableOpacity, Linking } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { Title } from '../components/BaseComponents';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import Colors from '../assets/Colors';
import { getUser } from '../lib/rewardsUtils';
import { RewardsStack, StoresStack, ResourcesStack } from './StackNavigators';

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

export class DrawerContent extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        id: null,
        name: null
      },
      link: 'http://tiny.cc/RewardsFeedback'
    };
  }
  async componentDidMount() {
    const userId = await AsyncStorage.getItem('userId');
    getUser(userId).then(userRecord => {
      if (userRecord) {
        const user = {
          id: userId,
          name: userRecord.fields.Name
        };
        this.setState({ user });
        return true;
      }
      return false;
    });
  }

  _logout = async () => {
    AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <View
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column'
        }}>
        <View
          style={{
            backgroundColor: Colors.black,
            height: 114,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            padding: 16
          }}>
          <Title style={{ color: 'white' }}>{this.state.user.name}</Title>
        </View>
        <DrawerItems {...this.props} />
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            verticalAlign: 'bottom'
          }}>
          <TouchableOpacity
            style={{ padding: 16 }}
            onPress={() => Linking.openURL(this.state.link)}>
            <Title>Report Issue</Title>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ paddingLeft: 16, paddingBottom: 21 }}
            onPress={() => this._logout()}>
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
    Resources: {
      screen: ResourcesStack,
      navigationOptions: () => ({
        title: 'Resources'
      })
    }
  },

  {
    contentOptions: {
      labelStyle: {
        fontFamily: 'poppins-medium',
        fontSize: 20
      },
      activeTintColor: Colors.primaryGreen
    },
    drawerWidth: 189,
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

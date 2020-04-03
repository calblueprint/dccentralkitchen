import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AsyncStorage, Linking, Platform, TouchableOpacity, View } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import { Title } from '../components/BaseComponents';
import Colors from '../constants/Colors';
import { getUser } from '../lib/rewardsUtils';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import RewardsScreen from '../screens/rewards/RewardsScreen';
import MyResourcesStack from './stack_navigators/ResourcesStack';
import MyRootStack from './stack_navigators/RootStack';
import MyStoresStack from './stack_navigators/StoresStack';

export const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {
    headerMode: 'none',
  },
});

const AuthStack = createStackNavigator();

function MyAuthStack() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: Colors.lightest },
      }}>
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
}

// TODO: combine with AuthLoading?
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
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');

    // Auth testing purpose
    // this.props.navigation.navigate('Auth');
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
        name: null,
      },
      link: 'http://tiny.cc/RewardsFeedback',
    };
  }

  async componentDidMount() {
    const userId = await AsyncStorage.getItem('userId');
    getUser(userId).then(userRecord => {
      if (userRecord) {
        const user = {
          id: userId,
          name: userRecord.fields.Name,
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
          flexDirection: 'column',
        }}>
        <View
          style={{
            backgroundColor: Colors.black,
            height: 114,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            padding: 16,
          }}>
          <Title style={{ color: 'white' }}>{this.state.user.name}</Title>
        </View>
        <DrawerItems {...this.props} />
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            verticalAlign: 'bottom',
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

const Drawer = createDrawerNavigator();

function MyDrawerNavigator() {
  return (
    <Drawer.Navigator
      contentOptions={{
        labelStyle: {
          fontFamily: 'poppins-medium',
          fontSize: 20,
        },
        activeTintColor: Colors.primaryGreen,
      }}
      drawerWidth={189}
      contentComponent={DrawerContent}>
      <Drawer.Screen
        name="Root"
        component={MyRootStack}
        options={{ title: 'Root', drawerLabel: () => null }}
      />
      <Drawer.Screen
        name="Stores"
        component={MyStoresStack}
        options={{ title: 'Stores' }}
      />
      <Drawer.Screen
        name="Rewards"
        options={{ title: 'Your Profile', drawerLockMode: 'locked-closed' }}>
        {props => <RewardsScreen {...props} tab={1} />}
      </Drawer.Screen>
      <Drawer.Screen
        name="Resources"
        component={MyResourcesStack}
        options={{ title: 'Resources' }}
      />
    </Drawer.Navigator>
  );
}

const AppStack = createStackNavigator();

export default function createAppContainer() {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        initialRouteName="AuthLoading"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: Colors.lightest },
        }}>
        <AppStack.Screen name="AuthLoading" component={AuthLoadingScreen} />
        <AppStack.Screen name="App" component={MyDrawerNavigator} />
        <AppStack.Screen name="Auth" component={MyAuthStack} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

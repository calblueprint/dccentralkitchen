import React from 'react';
import { AsyncStorage } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from '../screens/auth/LoginScreen';
import SignInScreen from '../screens/auth/SignUpScreen';
// import StoresScreen from '../screens/stores/StoresScreen';
import { createDrawerNavigator } from 'react-navigation-drawer';
// import PointsHistoryScreen from '../screens/PointsHistoryScreen';
// import ProductsDetailedScreen from '../screens/products/ProductsDetailedScreen';
// import ProductsScreen from '../screens/products/ProductsScreen';
// import StoreListScreen from '../screens/stores/StoreListScreen';
// import StoresDetailedScreen from '../screens/stores/StoresDetailedScreen';




import {StoresStack, HomeStack, AnnounceStack, HistoryStack} from './StackNavigators'
// import HomeStack from './StackNavigators'
import MainTabNavigator from './MainTabNavigator';

// TODO @JohnathanZhou should be either SignUpScreen or SignInScreen for consistency?
const AuthStack = createStackNavigator({
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
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return null;
  }
}

const MyDrawerNavigator = createDrawerNavigator({
  Stores: {
    screen: StoresStack,
    navigationOptions: ({ navigation }) => ({
      title: "Stores",
    }),
  },
  Announcements: {
    screen: AnnounceStack,
    navigationOptions: ({ navigation }) => ({
      title: "Announcements",
    }),
  },
  // To be merged with points history
  Home: {
    screen: HomeStack,
    navigationOptions: ({ navigation }) => ({
      title: "Your Profile",
    }),
  },
  History: {
    screen: HistoryStack,
    navigationOptions: ({ navigation }) => ({
      title: "Points History",
    }),
  },
  
});

// const StoresStack = createStackNavigator(
//   {
//     Stores: {screen:() => StoresScreen},
//     StoresDetailed: {screen:() =>StoresDetailedScreen},
//     StoreList: {screen:() =>StoreListScreen},
//     Products: {screen:() =>ProductsScreen},
//     ProductsDetailed: {screen:() =>ProductsDetailedScreen},
//   },
//   config
// );

// StoresStack.navigationOptions = {
//   drawerLabel: 'Stores',
//   // tabBarIcon: ({ focused }) => <Icon focused={focused} size={20} name="map-o" />,
//   headerLeft: () => <Icon title="HELLO" name="menu" size={30} color="#900" style = {{ marginLeft: 10}}
//     onPress={ () => alert("hello") }
//   />
//   // headerLeft: (
//   //   <TouchableOpacity onPress={() => navigation.goBack(null)} style={{left: Dimensions.get("window").height < 667 ? '8%' : '3%', backgroundColor: 'red', width: '100%'}}>
//   //     <Icon title="HELLO"></Icon>
//   //   </TouchableOpacity>
// // ),
// };

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
      // App: {
      //   screen: MyDrawerNavigator,
      // }
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
);

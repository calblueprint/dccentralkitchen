import React from 'react';
import { Platform } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';
import TabBarIcon from '../components/TabBarIcon';

import AnnouncementScreen from '../screens/AnnouncementScreen';
import AnnouncementsDetailedScreen from '../screens/AnnouncementsDetailedScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductsDetailedScreen from '../screens/products/ProductsDetailedScreen';
import ProductsScreen from '../screens/products/ProductsScreen';
import ReceiptScanner from '../screens/Camera';
import StoresDetailedScreen from '../screens/stores/StoresDetailedScreen';
import StoresScreen from '../screens/stores/StoresScreen';
import StoreListScreen from '../screens/stores/StoreListScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {}
});

// Home
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Camera: ReceiptScanner
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : `md-information-circle${focused ? '' : '-outline'}`
      }
    />
  )
};

HomeStack.path = '';

// Announcements

const AnnounceStack = createStackNavigator(
  {
    Announcements: AnnouncementScreen,
    AnnouncementsDetailed: AnnouncementsDetailedScreen
  },
  config
);

AnnounceStack.navigationOptions = {
  tabBarLabel: 'Announcements',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-notifications${focused ? '' : '-outline'}`
          : `md-notifications${focused ? '' : '-outline'}`
      }
    />
  )
};

AnnouncementScreen.path = '';

// Stores

const StoresStack = createStackNavigator(
  {
    Stores: StoresScreen,
    StoresDetailed: StoresDetailedScreen,
    StoreList: StoreListScreen,
    Products: ProductsScreen,
    ProductsDetailed: ProductsDetailedScreen
  },
  config
);

StoresStack.navigationOptions = {
  tabBarLabel: 'Stores',
  tabBarIcon: ({ focused }) => <Icon focused={focused} size={20} name="map-o" />
};

StoresScreen.path = '';

// TODO Spring 2020: Add customer profile/settings screenn
// const SettingsStack = createStackNavigator(
//   {
//     Settings: SettingsScreen
//   },
//   config
// );

// SettingsStack.navigationOptions = {
//   tabBarLabel: 'Settings',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
//     />
//   )
// };

// SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  AnnounceStack,
  StoresStack
  // SettingsStack
});

tabNavigator.path = '';

export default tabNavigator;

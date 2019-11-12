import React from 'react';
import { Platform } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import AnnouncementScreen from '../screens/AnnouncementScreen';
import AnnouncementsDetailedScreen from '../screens/AnnouncementsDetailedScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductsDetailedScreen from '../screens/ProductsDetailedScreen';
import ProductsScreen from '../screens/ProductsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import StoresScreen from '../screens/StoresScreen';
import StoresDetailedScreen from '../screens/StoresDetailedScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {}
});

const StoresStack = createStackNavigator(
  {
    Stores: StoresScreen,
    StoresDetailed: StoresDetailedScreen
  },
  config
);

StoresStack.navigationOptions = {
  tabBarLabel: 'Stores',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  )
};

StoresScreen.path = '';

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
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  )
};

AnnouncementScreen.path = '';

const ProductsStack = createStackNavigator(
  {
    Products: ProductsScreen,
    ProductsDetailed: ProductsDetailedScreen
  },
  config
);

ProductsStack.navigationOptions = {
  tabBarLabel: 'Products',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  )
};

ProductsScreen.path = '';

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
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
          : 'md-information-circle'
      }
    />
  )
};

HomeStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  )
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  AnnounceStack,
  ProductsStack,
  SettingsStack,
  StoresStack
});

tabNavigator.path = '';

export default tabNavigator;

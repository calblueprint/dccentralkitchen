import React from 'react';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import AllProductsScreen from '../screens/AllProductsScreen';
import AnnouncementScreen from '../screens/AnnouncementScreen';
import AnnouncementsDetailedScreen from '../screens/AnnouncementsDetailedScreen';
import ProductsDetailedScreen from '../screens/ProductsDetailedScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ReceiptScanner from '../screens/rewards/Camera';
import RewardsScreen from '../screens/rewards/RewardsScreen';
import StoreListScreen from '../screens/stores/StoreListScreen';
import StoresDetailedScreen from '../screens/stores/StoresDetailedScreen';
import StoresScreen from '../screens/stores/StoresScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {}
});

// Home
const HomeStack = createStackNavigator(
  {
    Home: RewardsScreen,
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

AnnouncementScreen.path = '';

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

// Products

const ProductsStack = createStackNavigator(
  {
    AllProducts: AllProductsScreen,
    Products: ProductsScreen,
    ProductsDetailed: ProductsDetailedScreen
  },
  config
);

ProductsStack.navigationOptions = {
  tabBarLabel: 'Products',
  tabBarIcon: ({ focused }) => <Icon size={20} name="shopping-cart" />
};

ProductsScreen.path = '';

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
  ProductsStack,
  StoresStack
  // SettingsStack
});

tabNavigator.path = '';

export default tabNavigator;

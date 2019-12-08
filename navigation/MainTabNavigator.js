import React from 'react';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import AnnouncementScreen from '../screens/AnnouncementScreen';
import AnnouncementsDetailedScreen from '../screens/AnnouncementsDetailedScreen';
import ReceiptScanner from '../screens/Camera';
import HomeScreen from '../screens/HomeScreen';
// testing purposes for transactions;
import PointsHistoryScreen from '../screens/PointsHistoryScreen';
import ProductsDetailedScreen from '../screens/products/ProductsDetailedScreen';
import ProductsScreen from '../screens/products/ProductsScreen';
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

HomeScreen.path = '';

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

// Testing for Points History

const HistoryStack = createStackNavigator(
  {
    PointsHistory: PointsHistoryScreen
  },
  config
);

PointsHistoryScreen.path = '';

// Stores

const StoresStack = createStackNavigator(
  {
    Stores: StoresScreen,
    StoresDetailed: StoresDetailedScreen,
    StoreList: StoreListScreen,
    Products: ProductsScreen,
    ProductsDetailed: ProductsDetailedScreen,
  },
  config
);

StoresStack.navigationOptions = {
  tabBarLabel: 'Stores',
  tabBarIcon: ({ focused }) => <Icon focused={focused} size={20} name="map-o" />,
  // headerLeft: () => <Icon title="HELLO" name="menu" size={30} color="#900" style = {{ marginLeft: 10}}
  //   onPress={ () => alert("hello") }
  // />
  // headerLeft: (
  //   <TouchableOpacity onPress={() => navigation.goBack(null)} style={{left: Dimensions.get("window").height < 667 ? '8%' : '3%', backgroundColor: 'red', width: '100%'}}>
  //     <Icon title="HELLO"></Icon>
  //   </TouchableOpacity>
// ),
};

// StoresScreen.path = '';

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
  // testing for Points History
  HistoryStack,
  AnnounceStack,
  StoresStack
  // SettingsStack
});

tabNavigator.path = '';

export default tabNavigator;

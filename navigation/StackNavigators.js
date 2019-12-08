import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';
import React from 'react';


import StoresScreen from '../screens/stores/StoresScreen';
import HomeScreen from '../screens/HomeScreen';
import ReceiptScanner from '../screens/Camera'

import ProductsDetailedScreen from '../screens/products/ProductsDetailedScreen';
import ProductsScreen from '../screens/products/ProductsScreen';
import StoreListScreen from '../screens/stores/StoreListScreen';
import StoresDetailedScreen from '../screens/stores/StoresDetailedScreen';
import AnnouncementScreen from '../screens/AnnouncementScreen'
import AnnouncementsDetailedScreen from '../screens/AnnouncementsDetailedScreen'
import PointsHistoryScreen from '../screens/PointsHistoryScreen'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {}
});

export const StoresStack = createStackNavigator(
    {
      Stores:  StoresScreen,
      StoresDetailed: StoresDetailedScreen,
      StoreList: StoreListScreen,
      Products: ProductsScreen,
      ProductsDetailed: ProductsDetailedScreen,
    },
    config
  );
  
StoresStack.navigationOptions = {
    drawerLabel: 'Stores',
    // tabBarIcon: ({ focused }) => <Icon focused={focused} size={20} name="map-o" />,
    // headerLeft: () => <Icon title="HELLO" name="menu" size={30} color="#900" style = {{ marginLeft: 10}}
    //   onPress={ () => alert("hello") }
    // />
    // headerLeft: (
    //   <TouchableOpacity onPress={() => navigation.goBack(null)} style={{left: Dimensions.get("window").height < 667 ? '8%' : '3%', backgroundColor: 'red', width: '100%'}}>
    //     <Icon title="HELLO"></Icon>
    //   </TouchableOpacity>
  // ),
};

export const HomeStack = createStackNavigator(
    {
      Home: HomeScreen,
      Camera: ReceiptScanner
    },
    config
  );
  
HomeStack.navigationOptions = {
    drawerLabel: 'Home'
}

export const AnnounceStack = createStackNavigator(
  {
    Announcements: AnnouncementScreen,
    AnnouncementsDetailed: AnnouncementsDetailedScreen
  },
  config
);

AnnounceStack.navigationOptions = {
  drawerLabel: 'Announcements'
}

export const HistoryStack = createStackNavigator(
  {
    PointsHistory: PointsHistoryScreen,
  },
  config
);

HistoryStack.navigationOptions = {
  drawerLabel: 'History'
}
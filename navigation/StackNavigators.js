import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

import StoresScreen from '../screens/stores/StoresScreen';
import RewardsScreen from '../screens/rewards/RewardsScreen';
import ReceiptScanner from '../screens/rewards/Camera';

import ProductsDetailedScreen from '../screens/products/ProductsDetailedScreen';
import ProductsScreen from '../screens/products/ProductsScreen';
import StoreListScreen from '../screens/stores/StoreListScreen';
import StoresDetailedScreen from '../screens/stores/StoresDetailedScreen';
import AnnouncementScreen from '../screens/AnnouncementScreen';
import AnnouncementsDetailedScreen from '../screens/AnnouncementsDetailedScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {}
});

export const StoresStack = createStackNavigator(
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
  drawerLabel: 'Stores'
};

export const RewardsStack = createStackNavigator(
  {
    RewardsHome: RewardsScreen,
    Camera: ReceiptScanner
  },
  config
);

RewardsStack.navigationOptions = {
  drawerLabel: 'Rewards'
};

export const AnnounceStack = createStackNavigator(
  {
    Announcements: AnnouncementScreen,
    AnnouncementsDetailed: AnnouncementsDetailedScreen
  },
  config
);

AnnounceStack.navigationOptions = {
  drawerLabel: 'Announcements'
};

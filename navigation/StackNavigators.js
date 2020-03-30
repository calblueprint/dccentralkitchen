import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
// Auth
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
// Map
import MapScreen from '../screens/map/MapScreen';
import ProductDetailsScreen from '../screens/map/ProductDetailsScreen';
import ProductsScreen from '../screens/map/ProductsScreen';
import StoreListScreen from '../screens/map/StoreListScreen';
// News
import NewsDetailsScreen from '../screens/news/NewsDetailsScreen';
import NewsScreen from '../screens/news/NewsScreen';
// Resources
import ResourcesScreen from '../screens/resources/ResourcesScreen';
import RewardsScreen from '../screens/rewards/RewardsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

export const AuthStack = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    Login: LoginScreen,
    SignUp: SignUpScreen,
  },
  config
);

export const StoresStack = createStackNavigator(
  {
    Stores: MapScreen,
    StoreList: StoreListScreen,
    Products: ProductsScreen,
    ProductDetails: ProductDetailsScreen,
  },
  config
);

StoresStack.navigationOptions = {
  drawerLabel: 'Stores',
};

export const RootStack = createStackNavigator(
  {
    MainStack: {
      screen: StoresStack,
    },
    RewardsOverlay: {
      screen: RewardsScreen,
    },
  },
  {
    headerMode: 'none',
    mode: 'modal',
  }
);

export const NewsStack = createStackNavigator(
  {
    News: NewsScreen,
    NewsDetails: NewsDetailsScreen,
  },
  config
);

NewsStack.navigationOptions = {
  drawerLabel: 'News',
};

export const ResourcesStack = createStackNavigator(
  {
    Resources: ResourcesScreen,
  },
  config
);

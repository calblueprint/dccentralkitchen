import { createBrowserApp } from '@react-navigation/web';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import StartUpScreen from '../screens/auth/StartUpScreen';
import SignInScreen from '../screens/auth/SignUpScreen';

const AuthStack = createStackNavigator({
  StartUp: StartUpScreen,
  SignIn: SignInScreen
});

const switchNavigator = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Auth: AuthStack
});
switchNavigator.path = '';

export default createBrowserApp(switchNavigator, { history: 'hash' });

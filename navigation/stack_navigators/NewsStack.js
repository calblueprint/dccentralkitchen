import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Platform } from 'react-native';
import NewsDetailsScreen from '../../screens/news/NewsDetailsScreen';
import NewsScreen from '../../screens/news/NewsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const NewsStack = createStackNavigator();

export default function MyNewsStack() {
  return (
    <NewsStack.Navigator
      screenOptions={{ drawerLabel: 'News', headerShown: false, config }}>
      <NewsStack.Screen name="News" component={NewsScreen} />
      <NewsStack.Screen name="NewsDetails" component={NewsDetailsScreen} />
    </NewsStack.Navigator>
  );
}

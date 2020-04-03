import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import NewsDetailsScreen from '../../screens/news/NewsDetailsScreen';
import NewsScreen from '../../screens/news/NewsScreen';
import config from '../AppNavigator';

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

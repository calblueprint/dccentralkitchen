import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Platform } from 'react-native';
import Colors from '../../constants/Colors';
import NewsDetailsScreen from '../../screens/news/NewsDetailsScreen';
import NewsScreen from '../../screens/news/NewsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {
    headerMode: 'none',
  },
});

const NewsStack = createStackNavigator();

export default function NewsStackNavigator() {
  return (
    <NewsStack.Navigator
      screenOptions={{
        drawerLabel: 'News',
        headerShown: false,
        cardStyle: { backgroundColor: Colors.bgLight },
        config,
      }}>
      <NewsStack.Screen name="News" component={NewsScreen} />
      <NewsStack.Screen name="NewsDetails" component={NewsDetailsScreen} />
    </NewsStack.Navigator>
  );
}

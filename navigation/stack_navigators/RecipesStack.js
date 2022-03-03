import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Platform } from 'react-native';
import Colors from '../../constants/Colors';
import RecipesScreen from '../../screens/recipes/RecipesScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {
    headerMode: 'none',
  },
});

const RecipesStack = createStackNavigator();

export default function RecipesStackNavigator() {
  return (
    <RecipesStack.Navigator
      screenOptions={{
        drawerLabel: 'Recipes',
        headerShown: false,
        cardStyle: { backgroundColor: Colors.bgLight },
        config,
      }}>
      <RecipesStack.Screen name="Recipes" component={RecipesScreen} />
    </RecipesStack.Navigator>
  );
}

import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import MapScreen from '../../screens/map/MapScreen';
import ProductDetailsScreen from '../../screens/map/ProductDetailsScreen';
import ProductsScreen from '../../screens/map/ProductsScreen';
import StoreListScreen from '../../screens/map/StoreListScreen';
import config from '../AppNavigator';

const StoresStack = createStackNavigator();

export default function MyStoresStack() {
  return (
    <StoresStack.Navigator
      screenOptions={{ drawerLabel: 'Stores', headerShown: false, config }}>
      <StoresStack.Screen name="Stores" component={MapScreen} />
      <StoresStack.Screen name="StoreList" component={StoreListScreen} />
      <StoresStack.Screen name="Products" component={ProductsScreen} />
      <StoresStack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
      />
    </StoresStack.Navigator>
  );
}

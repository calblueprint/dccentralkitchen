import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { Button, Title } from '../styles/shared';
import Product from './Product';
import StoreCard from './StoreCard';

function filterFruit(product) {
  if (product) {
    return product.category.includes('Fruit');
  }
  return false;
}

function filterVegetables(product) {
  if (product) {
    return product.category.includes('Vegetables');
  }
  return false;
}

class StoreProducts extends React.Component {
  detailedStoreTransition = store => {
    this.props.navigation.navigate('StoresDetailed', {
      currentStore: store
    });
  };

  render() {
    const { navigation, products, store } = this.props;
    return (
      <View>
        <StoreCard
          store={store}
          key={store.id}
          callBack={() => this.detailedStoreTransition(store)}
        />
        {/* TODO @tommypoa can probably make this (e.g Fruits title + fruits products) a sub-component and re-use it in AllProducts */}
        {/* Display fruits available at this store */}
        <View flexDirection="row">
          <Title>Fruits</Title>
          <Button
            onPress={() =>
              navigation.navigate('Products', {
                products: products.filter(filterFruit),
                navigation: this.props.navigation,
                productType: 'Fruits',
                store
              })
            }>
            <Title>See all</Title>
          </Button>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {products.filter(filterFruit).map(product => (
            <Button
              key={product.id}
              onPress={() =>
                navigation.navigate('ProductsDetailed', {
                  currentProduct: product,
                  store
                })
              }>
              <Product product={product} />
            </Button>
          ))}
        </ScrollView>
        {/* Display vegetables available at this store */}
        <View flexDirection="row">
          <Title>Veggies</Title>
          <Button
            onPress={() =>
              navigation.navigate('Products', {
                products: products.filter(filterVegetables),
                navigation,
                productType: 'Vegetables',
                store
              })
            }>
            <Title>See all</Title>
          </Button>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {products.filter(filterVegetables).map(product => (
            <Button
              key={product.id}
              onPress={() =>
                navigation.navigate('ProductsDetailed', {
                  currentProduct: product,
                  store
                })
              }>
              <Product product={product} />
            </Button>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default StoreProducts;

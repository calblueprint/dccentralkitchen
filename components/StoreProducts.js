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
<<<<<<< HEAD
  constructor(props) {
    super(props);
    const { navigation, store, products } = this.props;
    this.state = {
      navigation,
      store,
      products
    };
  }

=======
>>>>>>> 7a0f0f11bbcde748a20b7ff099611601d15acb70
  detailedStoreTransition = store => {
    this.props.navigation.navigate('StoresDetailed', {
      currentStore: store
    });
  };

<<<<<<< HEAD
  renderProducts = (filterType, productType) => {
    const { navigation, store, products } = this.state;
    return (
      <View>
        <View flexDirection="row">
          <Title>{productType}</Title>
          <Button
            onPress={() =>
              navigation.navigate('Products', {
                products: products.filter(filterType),
                navigation,
                productType,
=======
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
>>>>>>> 7a0f0f11bbcde748a20b7ff099611601d15acb70
                store
              })
            }>
            <Title>See all</Title>
          </Button>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
<<<<<<< HEAD
          {products.filter(filterType).map(product => (
=======
          {products.filter(filterVegetables).map(product => (
>>>>>>> 7a0f0f11bbcde748a20b7ff099611601d15acb70
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
<<<<<<< HEAD
  };

  render() {
    const { store } = this.state;
    return (
      <View>
        <StoreCard
          store={store}
          key={store.id}
          callBack={() => this.detailedStoreTransition(store)}
        />
        {/* Display fruits available at this store */}
        <View>{this.renderProducts(filterFruit, 'Fruit')}</View>
        <View>{this.renderProducts(filterVegetables, 'Vegetables')}</View>
      </View>
    );
=======
>>>>>>> 7a0f0f11bbcde748a20b7ff099611601d15acb70
  }
}

export default StoreProducts;

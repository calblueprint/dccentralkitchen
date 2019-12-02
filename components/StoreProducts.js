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

  renderProducts = (filterType, productType, products, navigation, store) => {
    return (
      <View>
        <View flexDirection="row">
          <Title>{productType}</Title>
          <Button
            onPress={() =>
              navigation.navigate('Products', {
                products: products.filter(filterType),
                navigation: this.props.navigation,
                productType: productType,
                store
              })
            }>
            <Title>See all</Title>
          </Button>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {products.filter(filterType).map(product => (
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
        <View>
          {this.renderProducts(
            filterFruit,
            'Fruit',
            products,
            navigation,
            store
          )}
        </View>
        <View>
          {this.renderProducts(
            filterVegetables,
            'Vegetables',
            products,
            navigation,
            store
          )}
        </View>
      </View>
    );
  }
}

export default StoreProducts;

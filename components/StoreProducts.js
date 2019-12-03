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
  constructor(props) {
    super(props);
    const { navigation, store, products } = this.props;
    this.state = {
      navigation,
      store,
      products
    };
  }

  detailedStoreTransition = store => {
    this.props.navigation.navigate('StoresDetailed', {
      currentStore: store
    });
  };

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
  }
}

export default StoreProducts;

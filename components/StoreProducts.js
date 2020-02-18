import StoreCard from './StoreCard';
import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Product from './Product';

import {TextButton} from '../components/BaseComponents';
import { Button ,Title} from '../styles/shared';

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

  renderProducts = (filterType, productType) => {
    const { navigation, store, products } = this.props;
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
            <TextButton>See all</TextButton>
          </Button>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {products.filter(filterType).map(product => (
            // TODO See if there is a better way to pass the props over to a component
            <Product
              key={product.id}
              product={product}
              navigation={navigation}
              store={store}
            />
          ))}
        </ScrollView>
      </View>
    );
  };

  render() {
    const { store } = this.props;
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

import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Product from './Product';
import { Button, Title } from '../styles/shared';
import StoreCard from './StoreCard';

// let fullProducts;
// const productsTable = BASE('Products').select({ view: 'Grid view' });
// productsTable.firstPage((err, records) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   fullProducts = records.map(record => createProductData(record));
// });

// function filterProductRecord(storeProducts) {
//   return fullProducts.filter(product => storeProducts.includes(product.id));
// }

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
    this.state = {
      products: this.props.products,
      store: this.props.store,
      navigation: this.props.navigation
    };
  }

  detailedStoreTransition = store => {
    this.props.navigation.navigate('StoresDetailed', {
      currentStore: store
    });
  };

  render() {
    const { navigation, products } = this.state; // TODO @tommypoa ASYNC
    return (
      <View>
        <StoreCard
          store={this.state.store}
          key={this.state.store.id}
          callBack={() => this.detailedStoreTransition(this.state.store)}
        />
        {/* Display fruits available at this store */}
        <View flexDirection="row">
          <Title>Fruits</Title>
          {/* TODO @tommypoa See all: pass current store as prop and show as Title if non-null prop */}
          <Button
            onPress={() =>
              navigation.navigate('Products', {
                products: products.filter(filterFruit),
                navigation: this.props.navigation,
                productType: 'Fruits'
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
                  currentProduct: product
                })
              }>
              <Product product={product} />
            </Button>
          ))}
        </ScrollView>
        {/* Display vegetables available at this store */}
        <View flexDirection="row">
          <Title>Veggies</Title>
          {/* TODO @tommypoa See all: pass current store as prop and show as Title if non-null prop */}
          <Button
            onPress={() =>
              navigation.navigate('Products', {
                products: products.filter(filterVegetables),
                navigation,
                productType: 'Vegetables'
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
                  currentProduct: product
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

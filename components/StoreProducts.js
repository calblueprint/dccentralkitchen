import React from 'react';
import { View, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Product from './Product';
import BASE from '../lib/common';
import { Button, ScrollCategory, H3, Title, Subtitle } from '../styles/shared';
import { styles } from '../styles/products';

function createProductData(record) {
  console.log(record);
  const data = record.fields;
  return {
    name: data.Name,
    id: data.id,
    category: data.Category,
    points: data.Points,
    customerCost: data['Customer Cost']
  };
}

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

class StoreProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      navigation: null
    };
  }

  componentDidMount() {
    const { navigation, store } = this.props;
    // Gracefully handle empty products list in current store
    let products = [];
    if (store.products) {
      products = store.products.map(id =>
        createProductData(BASE('Products').find(id))
      );
    }
    this.setState({ products, navigation });
  }

  render() {
    const { navigation, products } = this.state; // TODO @tommypoa ASYNC
    return (
      <View>
        <View flexDirection="row">
          <Title>Fruits</Title>
          <Button
            onPress={() =>
              navigation.navigate('Products', {
                products: products.filter(product =>
                  product.category.includes('Fruit')
                ),
                navigation: this.props.navigation,
                productType: 'Fruits'
              })
            }>
            <Title>See all</Title>
          </Button>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {products
            .filter(product => product.category.includes('Fruit'))
            .map((product, index) => (
              <Button
                onPress={() =>
                  navigation.navigate('ProductsDetailed', {
                    currentProduct: product
                  })
                }>
                <Product product={product} />
              </Button>
            ))}
        </ScrollView>
        <View flexDirection="row">
          <Title>Veggies</Title>
          <Button
            onPress={() =>
              navigation.navigate('Products', {
                products: products.filter(product =>
                  product.category.includes('Vegetables')
                ),
                navigation,
                productType: 'Vegetables'
              })
            }>
            <Title>See all</Title>
          </Button>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {products
            .filter(product => product.category.includes('Vegetables'))
            .map((product, index) => (
              <Button
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

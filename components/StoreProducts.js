import React from 'react';
import { View, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Product from './Product';
import BASE from '../lib/common';
import { Button, ScrollCategory, styles, H3, Title, Subtitle } from '../styles';

function createProductData(record) {
  const data = record.fields;
  return {
    name: data.Name,
    id: data.id,
    category: data.Category,
    points: data.Points,
    customerCost: data['Customer Cost']
  };
}

let fullProducts;
const productsTable = BASE('Products').select({ view: 'Grid view' });
productsTable.firstPage((err, records) => {
  if (err) {
    console.error(err);
    return;
  }
  fullProducts = records.map(record => createProductData(record));
});

function filterProductRecord(storeProducts) {
  return fullProducts.filter(product => storeProducts.includes(product.id));
}

class StoreProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: filterProductRecord(props.products)
    };
  }

  render() {
    const { products } = this.state; // TODO @tommypoa ASYNC
    return (
      <View>
        <View flexDirection="row">
          <Title>Fruits</Title>
          <Button
            onPress={() =>
              this.props.navigation.navigate('Products', {
                products: products.filter(product =>
                  product.category.includes('Fruit')
                ),
                navigation: this.props.navigation
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
                  this.props.navigation.navigate('ProductsDetailed', {
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
              this.props.navigation.navigate('Products', {
                products: products.filter(product =>
                  product.category.includes('Vegetables')
                ),
                navigation: this.props.navigation
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
                  this.props.navigation.navigate('ProductsDetailed', {
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

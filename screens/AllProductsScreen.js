import React from 'react';
import { View, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Product from '../components/Product';
import BASE from '../lib/common';
import { Button, ScrollCategory, H3, Title, Subtitle } from '../styles/shared';
import { styles } from '../styles/products';

const productsTable = BASE('Products').select({ view: 'Grid view' });
let fullProducts;
const categories = [
  // Hard-coded for now -- should find a way to extract this information dynamically?
  'All',
  'Cut Fruit & Packaged Products',
  'Fruit',
  'Vegetables',
  'Frozen & Dried'
];
productsTable.firstPage((err, records) => {
  if (err) {
    console.error(err);
    return;
  }
  fullProducts = records.map(record => createProductData(record));
});

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

class AllProductsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: fullProducts,
      filter: null
    };
  }

  handleCategoryPress = filter => {
    const toSet =
      filter === 'All'
        ? fullProducts
        : fullProducts.filter(product => product.category.includes(filter));
    this.setState({ products: toSet });
  };

  render() {
    let {products} = this.state; // TODO @tommypoa ASYNC
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

export default AllProductsScreen;
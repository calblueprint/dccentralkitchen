import React from 'react';
import { FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Product from '../components/Product';
import { base } from '../lib/common.js';
import { Button, ScrollCategory, styles } from '../styles.js';

const productsTable = base('Products').select({ view: 'Grid view' });
var fullProducts;
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

class ProductsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: fullProducts,
      filter: null
    };
  }

  handleCategoryPress = filter => {
    const toSet =
      filter == 'All'
        ? fullProducts
        : fullProducts.filter(product => product.category.includes(filter));
    this.setState({ products: toSet });
  };

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {categories.map(category => (
            <Button onPress={() => this.handleCategoryPress(category)}>
              <ScrollCategory> {category} </ScrollCategory>
            </Button>
          ))}
        </ScrollView>
        <FlatList
          // TODO @tommypoa refactor styles to use styled-components
          style={styles.container}
          numColumns={3}
          data={this.state.products}
          renderItem={({ item }) => (
            <Button
              onPress={() =>
                this.props.navigation.navigate('ProductsDetailed', {
                  currentProduct: item
                })
              }
            >
              <Product product={item} />
            </Button>
          )}
          keyExtractor={(item, index) => index.toString()}
        ></FlatList>
      </ScrollView>
    );
  }
}

function createProductData(record) {
  object = record.fields;
  return {
    name: object['Name'],
    id: record.id,
    category: object['Category'],
    points: object['Points'],
    customerCost: object['Customer Cost']
  };
}

export default ProductsScreen;

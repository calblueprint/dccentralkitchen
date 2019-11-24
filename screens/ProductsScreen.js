import React from 'react';
import { FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Product from '../components/Product';
import BASE from '../lib/common';
import { Button, ScrollCategory, styles } from '../styles';

const productsTable = BASE('Products').select({ view: 'Grid view' });
// let fullProducts;
const categories = [
  // Hard-coded for now -- should find a way to extract this information dynamically?
  'All',
  'Cut Fruit & Packaged Products',
  'Fruit',
  'Vegetables',
  'Frozen & Dried'
];
// productsTable.firstPage((err, records) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   fullProducts = records.map(record => createProductData(record));
// });

var fullProducts;

function createProductData(record) {
  let data = record.fields;
  return {
    name: data.Name,
    id: data.id,
    category: data.Category,
    points: data.Points,
    customerCost: data['Customer Cost']
  };
}

class ProductsScreen extends React.Component {
  constructor(props) {
    fullProducts = props.navigation.state.params.products;
    super(props);
    this.state = {
      products: props.navigation.state.params.products,
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
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          // TODO @tommypoa refactor styles to use styled-components
          style={styles.container}
          keyExtractor={item => item.id}
          numColumns={2}
          data={this.state.products}
          renderItem={({ item }) => (
            // TODO @tommypoa: think it would be better to extract the `onPress` here,
            // and possibly create the Button wrapping a Product using a function as with other components, but in-file
            <Button
              onPress={() =>
                this.props.navigation.navigate('ProductsDetailed', {
                  currentProduct: item
                })
              }>
              <Product product={item} />
            </Button>
          )}
        />
      </ScrollView>
    );
  }
}

export default ProductsScreen;

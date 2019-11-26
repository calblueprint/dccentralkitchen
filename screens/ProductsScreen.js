import React from 'react';
import { FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Product from '../components/Product';
import BASE from '../lib/common';
import { styles } from '../styles/products';
import { Button, Title } from '../styles/shared';

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

class ProductsScreen extends React.Component {
  constructor(props) {
    const { products, navigation, productType } = props.navigation.state.params;
    super(props);
    this.state = {
      products,
      navigation,
      productType
    };
  }

  render() {
    const { products, navigation, productType } = this.state;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>{productType}</Title>
        <FlatList
          // TODO @tommypoa refactor styles to use styled-components
          style={styles.container}
          keyExtractor={item => item.id}
          numColumns={2}
          data={products}
          renderItem={({ item }) => (
            // TODO @tommypoa: think it would be better to extract the `onPress` here,
            // and possibly create the Button wrapping a Product using a function as with other components, but in-file
            <Button
              onPress={() =>
                navigation.navigate('ProductsDetailed', {
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

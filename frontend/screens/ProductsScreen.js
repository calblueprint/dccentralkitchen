import React from 'react';
import Airtable from 'airtable';
import { styles } from '../styles.js';
// import Product from '../components/Product';

import {
  Text,
  View,
  FlatList,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DrawerItems } from 'react-navigation';

// Initializing DC Base: Can probably be done somewhere else but here for now.
const base = new Airtable({ apiKey: ''}).base(
    "app4fXK49bqcjDMEo"
);
const productsTable = base("Products").select({view: "Grid view"})
var products;
const categories = [ // Hard-coded for now -- should find a way to extract this information dynamically
    "Cut Fruit & Packaged Products",
    "Fruit",
    "Vegetables",
    "Frozen & Dried"
]
productsTable.firstPage((err, records) => {
    if (err) {
        console.error(err);
        return;
    }
    products = records.map(record => createProductData(record))
})

class ProductsScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          products: products,
      };
    }
    
    render() {
        const products = this.state.products
        return (
            <View>
                <ScrollView horizontal={true}>
                    {categories.map((category) =>
                        <Text>{category}    </Text>
                    )}
                </ScrollView>
                <FlatList 
                    style = {styles.container}
                    contentContainerStyle = {styles.content_container}
                    numColumns = {3}
                    data = {products}
                    renderItem={({ item }) => (
                        <Product product={item} />
                    )}
                    keyExtractor={(item, index) => index.toString()}>
                </FlatList>
            </View>
        )
    }
}

function Product({ product }) {
    return (
      <View style={styles.item}>
          <Text>
              {product.name}
          </Text>
      </View>
    );
  }


function createProductData(record) {
    object = record.fields
    return {
        name: object["Name"],
        id: record.id,
        category: object["Category"],
        points: object["Points"],
        customerCost: object["Customer Cost"]
    }
}

export default ProductsScreen;

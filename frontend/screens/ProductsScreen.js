import React from 'react';
import Airtable from 'airtable';
import { styles } from '../styles.js';
// import Product from '../components/Product';

import {
  Text,
  View,
  FlatList,
} from 'react-native';

// Initializing DC Base: Can probably be done somewhere else but here for now.
const base = new Airtable({ apiKey: ''}).base(
    "app4fXK49bqcjDMEo"
);
const productsTable = base("Products").select({view: "Grid view"})
var productsList;
productsTable.firstPage((err, records) => {
    if (err) {
        console.error(err);
        return;
    }
    productsNames = records.map(record => record.get("Name"))
    // idList = records.map(record => record.id)
    productsList = productsNames.map(product => createProductData(product))
})

class ProductsScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          productsList: productsList,
      };
    }
    
    render() {
        const productsList = this.state.productsList
        return (
            <FlatList 
                style = {styles.container}
                contentContainerStyle = {styles.content_container}
                numColumns = {3}
                data = {productsList}
                renderItem={({ item }) => (
                    <Item name={item.name} />
                )}
                keyExtractor={(item, index) => index.toString()}>
            </FlatList>
        )
    }
}

function Item({ name }) {
    return (
      <View style={styles.item}>
          <Text>
              {name}
          </Text>
      </View>
    );
  }


function createProductData(name) {
    return {
        name: name
    }
}

export default ProductsScreen;

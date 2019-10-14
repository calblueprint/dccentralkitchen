import React from 'react';
import Airtable from 'airtable';
import { styles, Button, ScrollCategory } from '../styles.js';
import Product from '../components/Product';

import {
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

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

    handleCategoryPress = () => {

    }
    
    render() {
        const products = this.state.products
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <ScrollView 
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                    {categories.map((category) =>
                        <Button onPress={() => this.handleCategoryPress}>
                            <ScrollCategory>{category}    </ScrollCategory>
                        </Button>
                    )}
                </ScrollView>
                <FlatList 
                    style = {styles.container}
                    numColumns = {3}
                    data = {products}
                    renderItem={({ item }) => (
                        <Button onPress={() =>
                            this.props.navigation.navigate('ProductsDetailed', {
                                currentProduct: item
                            }
                            )
                          }>
                            <Product product={item}/>
                        </Button>
                    )}
                    keyExtractor={(item, index) => index.toString()}>
                </FlatList>
            </ScrollView>
        )
    }
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

import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import Airtable from 'airtable';

import Product from '../components/Product';

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { MonoText } from '../components/StyledText';


// Initializing DC Base: Can probably be done somewhere else but here for now.
const base = new Airtable({ apiKey: ''}).base(
    "app4fXK49bqcjDMEo"
);
const productsTable = base("Products").select({view: "Grid view"})
var productsList = [];
productsTable.firstPage((err, records) => {
    if (err) {
        console.error(err);
        return;
    }
    productsList = records.map(record => record.get("Name"))
    // console.log(productsList)
})

class ProductsScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          productsList: productsList
      };
    }
    

    render() {
        const { productsList } = this.state
        console.log(productsList)
        return (
            <View>
                {productsList.map((product) => {
                    return (
                    <Text>{product}</Text>
                    )})
                }
            </View>
            )
    }
}

export default ProductsScreen;

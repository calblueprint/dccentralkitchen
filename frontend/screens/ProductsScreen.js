import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import Airtable from 'airtable';

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
import Product from '../components/Product';

// Initializing DC Base
const base = new Airtable({ apiKey: ''}).base(
    "app4fXK49bqcjDMEo"
  );
const productsTable = base("Products").select({view: "Grid view"})


export default function ProductsScreen() {
    productsTable.firstPage((err, records) => {
        if (err) {
            console.error(err);
            return;
        }
        const productsList = records.map(record => record.get("Name"))
        console.log(productsList)
    })
  return (
      <Product></Product>
  )
} 

// return (
//   <div>
//   {productsList.map((product) => {
//     return (
//       {product}
//     )})
//   }
//   </div>
// )
// }

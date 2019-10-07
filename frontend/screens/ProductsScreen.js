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
  FlatList,
  Dimensions,

} from 'react-native';

import { MonoText } from '../components/StyledText';


// Initializing DC Base: Can probably be done somewhere else but here for now.
const base = new Airtable({ apiKey: ''}).base(
    "app4fXK49bqcjDMEo"
);
const productsTable = base("Products").select({view: "Grid view"})
var productsList = [];
var keyValue;
productsTable.firstPage((err, records) => {
    if (err) {
        console.error(err);
        return;
    }
    productsList = records.map(record => {record.get("Name")})
    idList = records.map(record => {record.id})
    keyValue =  idList.reduce(function(result, field, index) {
        result[productsList[index]] = field;
        return result;
      }, {})
    // console.log(productsList)
})

class ProductsScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          productsList: productsList,
          keyValue: keyValue
      };
    }
    

    render() {
        const { productsList, keyValue } = this.state
        console.log(productsList)
        return (
            <FlatList 
                style = {styles.container}
                numColumns = {2}
                data = {keyValue}
                renderItem={({ product }) => (
                    <View style={styles.item}>
                        <Text>{product.key}</Text>
                    </View>
                    
                )}>
            </FlatList>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginVertical: 20,
    },
    item: {
    //   backgroundColor: '#4D243D',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      margin: 1,
      height: Dimensions.get('window').width / 2
    }
})
export default ProductsScreen;

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

// Initializing DC Base: Can/should it be done somewhere else?
const base = new Airtable({ apiKey: ''}).base(
    "app4fXK49bqcjDMEo"
);
const storesTable = base("Stores").select({view: "Grid view"})

class StoresScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }
    
    render() {
        return (
        )
    }
}

function createStoreData(record) {
    object = record.fields
    return {
    }
}

export default ProductsScreen;

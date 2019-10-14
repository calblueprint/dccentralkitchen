import React from 'react';
import Airtable from 'airtable';
import { styles, Button } from '../styles.js';
import Product from '../components/Product';
import ProductInfo from '../components/ProductInfo';


import {
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


class ProductsDetailedScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {
    const currentProduct = this.props.navigation.state.params.currentProduct;
    return (
      <ProductInfo product={currentProduct}/>
      )
    }
    
  }
  
  export default ProductsDetailedScreen;

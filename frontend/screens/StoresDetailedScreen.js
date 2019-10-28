import React from 'react';
import { Image, View, Text } from 'react-native';

import ProductInfo from '../components/ProductInfo';
import { styles } from '../styles.js';

class ProductsDetailedScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.imageContainer}>
       <Text>hi</Text>
      </View>
    );
  }
}

export default ProductsDetailedScreen;

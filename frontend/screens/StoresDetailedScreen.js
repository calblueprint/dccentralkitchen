import React from 'react';
import { Image, View, Text } from 'react-native';

import StoreInfo from '../components/StoreInfo';
import { styles } from '../styles.js';

class ProductsDetailedScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const currentStore = this.props.navigation.state.params.currentStore;
    return (
      <View>
        <StoreInfo store={currentStore}/>
      </View>
    );
  }
}

export default ProductsDetailedScreen;

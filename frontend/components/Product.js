import React from 'react';
import { Image, View } from 'react-native';

import { ProductBody, ProductContainer } from '../styles.js';

/**
 * @prop
 **/

// TODO @tommypoa to use styled-components
function Product({ product }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Image
        source={require('../assets/images/robot-dev.png')}
        style={{ width: 50, height: 50, borderRadius: 80 / 2 }}
      />
      <ProductBody>{product.name}</ProductBody>
    </View>
  );
}

export default Product;

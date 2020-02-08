import React from 'react';
import { Image, View } from 'react-native';

import { ProductBody } from '../styles/products';
import { Button } from '../styles/shared';

/**
 * @prop
 * */

// TODO @tommypoa to use styled-components
function Product({ product, store, navigation }) {
  return (
    <Button
      onPress={() =>
        navigation.navigate('ProductDetails', {
          currentProduct: product,
          store
        })
      }>
      <View style={{ alignItems: 'center' }}>
        <Image
          source={require('../assets/images/robot-dev.png')}
          style={{ width: 50, height: 50, borderRadius: 80 / 2 }}
        />
        <ProductBody>{product.name}</ProductBody>
      </View>
    </Button>
  );
}

export default Product;

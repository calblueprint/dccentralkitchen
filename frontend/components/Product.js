import React from 'react';
import { ProductContainer, ProductBody } from '../styles.js';
import {
    Text,
    View,
    Image
  } from 'react-native';

/**
 * @prop 
**/

function Product({ product }) {
    return (
      <View style={{alignItems: 'center'}}>
          <Image
            source={require('../assets/images/robot-dev.png')}
            style={{ width: 50, height: 50, borderRadius: 80 / 2 }}/>
          <ProductBody>
              {product.name}
          </ProductBody>
      </View>
      
    );
  }

export default Product;



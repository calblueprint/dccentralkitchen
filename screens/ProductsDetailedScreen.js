import React from 'react';
import { Image, View } from 'react-native';

import ProductInfo from '../components/ProductInfo';
import { ImageContainer } from '../styles/products';

class ProductsDetailedScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { currentProduct } = this.props.navigation.state.params;
    return (
      <ImageContainer>
        <ProductInfo product={currentProduct} />
        <View style={{ marginTop: 40 }}>
          <Image
            source={require('../assets/images/robot-dev.png')}
            style={{ width: 80, height: 80, borderRadius: 80 / 2 }}
          />
        </View>
      </ImageContainer>
    );
  }
}

export default ProductsDetailedScreen;

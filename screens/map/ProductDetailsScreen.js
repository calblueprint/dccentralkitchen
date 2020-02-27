import React from 'react';
import { Image, View } from 'react-native';
import ProductInfo from '../../components/product/ProductInfo';
import { ImageContainer } from '../../styled/product';
import { Title } from '../../styled/shared';

class ProductDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { currentProduct, store } = this.props.navigation.state.params;
    return (
      <View>
        <ImageContainer>
          <ProductInfo product={currentProduct} />
          <View style={{ marginTop: 40 }}>
            <Image
              source={require('../../assets/images/robot-dev.png')}
              style={{ width: 80, height: 80, borderRadius: 80 / 2 }}
            />
          </View>
        </ImageContainer>
      </View>
    );
  }
}

export default ProductDetailsScreen;

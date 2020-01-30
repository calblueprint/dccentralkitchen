import React from 'react';
import { Image, View } from 'react-native';

import ProductInfo from '../../components/ProductInfo';
import { ImageContainer } from '../../styles/products';
import { Title } from '../../styles/shared';

class ProductsDetailedScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { currentProduct, store } = this.props.navigation.state.params;
    return (
      <View>
        <Title>
          Current Store:
          {store.name}
        </Title>
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

export default ProductsDetailedScreen;

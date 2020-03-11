import React from 'react';
import { Image } from 'react-native';
import ProductInfo from '../../components/product/ProductInfo';
import { ProductInfoImageContainer } from '../../styled/product';
import { RowContainer } from '../../styled/shared';

class ProductDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { currentProduct, store } = this.props.navigation.state.params;
    return (
      <RowContainer>
        <ProductInfo product={currentProduct} />
        <ProductInfoImageContainer>
          <Image
            source={{ uri: currentProduct.image }}
            style={{ width: 80, height: 80, borderRadius: 80 / 2 }}
          />
        </ProductInfoImageContainer>
      </RowContainer>
    );
  }
}

export default ProductDetailsScreen;

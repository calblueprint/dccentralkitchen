import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Image, View } from 'react-native';
import {
  NavButton,
  NavHeaderContainer,
  NavTitle,
} from '../../components/BaseComponents';
import ProductInfo from '../../components/product/ProductInfo';
import { SpaceBetweenRowContainer } from '../../styled/shared';

export default class ProductDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { currentProduct, store } = this.props.navigation.state.params;
    return (
      <View>
        <NavHeaderContainer withMargin backgroundColor="transparent" noShadow>
          <NavButton onPress={() => this.props.navigation.goBack()}>
            <FontAwesome5 name="times" solid size={24} />
          </NavButton>
          <NavTitle />
        </NavHeaderContainer>
        <SpaceBetweenRowContainer
          style={{
            marginLeft: 20,
            marginRight: 8,
          }}>
          <ProductInfo style={{ flexShrink: 2 }} product={currentProduct} />
          <Image
            source={{ uri: currentProduct.imageUrl }}
            style={{ width: 80, height: 80 }}
          />
        </SpaceBetweenRowContainer>
      </View>
    );
  }
}

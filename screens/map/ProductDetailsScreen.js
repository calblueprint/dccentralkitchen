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
    const { currentProduct } = this.props.route.params;
    return (
      <View>
        <NavHeaderContainer withMargin backgroundColor="rgba(0,0,0,0)" noShadow>
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
            source={{ uri: currentProduct.image }}
            style={{ width: 80, height: 80 }}
          />
        </SpaceBetweenRowContainer>
      </View>
    );
  }
}

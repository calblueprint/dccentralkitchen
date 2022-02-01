import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Image, View } from 'react-native';
import {
  NavButtonContainer,
  NavHeaderContainer,
  NavTitle,
} from '../../components/BaseComponents';
import ProductInfo from '../../components/product/ProductInfo';
import { SpaceBetweenRowContainer } from '../../styled/shared';

export default function ProductDetailsScreen(props) {
  const { currentProduct } = props.route.params;

  return (
    <View>
      <NavHeaderContainer withMargin backgroundColor="transparent" noShadow>
        <NavButtonContainer onPress={() => props.navigation.goBack()}>
          <FontAwesome5 name="times" solid size={24} />
        </NavButtonContainer>
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

ProductDetailsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

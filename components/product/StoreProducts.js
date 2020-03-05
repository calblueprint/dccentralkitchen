import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  ButtonContainer,
  ButtonLabel,
  Title,
  Subhead
} from '../BaseComponents';
import StoreCard from '../store/StoreCard';
import ProductCard from './ProductCard';
import { ProductCardContainer, styles } from '../../styled/product';
import { SpaceBetweenRowContainer } from '../../styled/shared';

class StoreProducts extends React.Component {
  // TODO @tommypoa or @anniero98 - move this into shared utils with StoreListScreen
  render() {
    const { navigation, store, products } = this.props;
    return (
      <View>
        <StoreCard store={store} key={store.id} seeProduct={false} />
        <View>
          <SpaceBetweenRowContainer>
            <Title>Products</Title>
            <ButtonContainer
              onPress={() =>
                navigation.navigate('Products', {
                  products,
                  navigation,
                  store
                })
              }>
              <Subhead color="black">See all {products.length}</Subhead>
            </ButtonContainer>
          </SpaceBetweenRowContainer>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}>
            {products.map(product => (
              // TODO See if there is a better way to pass the props over to a component
              <ProductCardContainer key={product.id}>
                <ProductCard
                  key={product.id}
                  product={product}
                  navigation={navigation}
                  store={store}
                />
              </ProductCardContainer>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default StoreProducts;

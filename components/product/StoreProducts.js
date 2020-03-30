import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ProductCardContainer, styles } from '../../styled/product';
import { SpaceBetweenRowContainer } from '../../styled/shared';
import { ButtonContainer, Subhead, Title } from '../BaseComponents';
import StoreCard from '../store/StoreCard';
import ProductCard from './ProductCard';

function StoreProducts({ navigation, store, products }) {
  // TODO @tommypoa or @anniero98 - move this into shared utils with StoreListScreen
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
                store,
              })
            }>
            <Subhead color="black">
              See all
              {products.length}
            </Subhead>
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
                displayPoints={false}
              />
            </ProductCardContainer>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
StoreProducts.propTypes = {
  products: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default StoreProducts;

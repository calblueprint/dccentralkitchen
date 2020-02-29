import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ButtonContainer, ButtonLabel, Title } from '../BaseComponents';
import StoreCard from '../store/StoreCard';
import ProductCard from './ProductCard';
import { SpaceBetweenRowContainer } from '../../styled/shared';
import { styles } from '../../styled/product';

function filterFruit(product) {
  if (product) {
    return product.category.includes('Fruit');
  }
  return false;
}

function filterVegetables(product) {
  if (product) {
    return product.category.includes('Vegetables');
  }
  return false;
}

class StoreProducts extends React.Component {
  // TODO @tommypoa or @anniero98 - move this into shared utils with StoreListScreen

  renderProducts = (filterType, productType) => {
    const { navigation, store, products } = this.props;
    return (
      <View>
        <SpaceBetweenRowContainer>
          <Title>{productType}</Title>
          <ButtonContainer
            onPress={() =>
              navigation.navigate('Products', {
                products: products.filter(filterType),
                navigation,
                productType,
                store
              })
            }>
            <ButtonLabel color="black">See All ({products.length})</ButtonLabel>
          </ButtonContainer>
        </SpaceBetweenRowContainer>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}>
          {products.filter(filterType).map(product => (
            // TODO See if there is a better way to pass the props over to a component
            <ProductCard
              key={product.id}
              product={product}
              navigation={navigation}
              store={store}
            />
          ))}
        </ScrollView>
      </View>
    );
  };

  render() {
    const { store } = this.props;
    return (
      <View>
        <StoreCard store={store} key={store.id} seeProduct={false} />
        {/* Display fruits available at this store */}
        <View>{this.renderProducts(filterFruit, 'Fruit')}</View>
        <View>{this.renderProducts(filterVegetables, 'Vegetables')}</View>
      </View>
    );
  }
}

export default StoreProducts;

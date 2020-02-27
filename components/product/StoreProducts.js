import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Title } from '../../styled/shared';
import { TextButton } from '../BaseComponents';
import StoreCard from '../store/StoreCard';
import Product from './Product';

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
        <View flexDirection="row">
          <Title>{productType}</Title>
          <Button
            onPress={() =>
              navigation.navigate('Products', {
                products: products.filter(filterType),
                navigation,
                productType,
                store
              })
            }>
            <TextButton>See All</TextButton>
          </Button>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {products.filter(filterType).map(product => (
            // TODO See if there is a better way to pass the props over to a component
            <Product
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
        <StoreCard store={store} key={store.id} />
        {/* Display fruits available at this store */}
        <View>{this.renderProducts(filterFruit, 'Fruit')}</View>
        <View>{this.renderProducts(filterVegetables, 'Vegetables')}</View>
      </View>
    );
  }
}

export default StoreProducts;

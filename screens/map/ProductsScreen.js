import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { FlatList, View } from 'react-native';
import {
  NavButtonContainer,
  NavHeaderContainer,
  NavTitle,
  Title,
} from '../../components/BaseComponents';
import ProductCard from '../../components/product/ProductCard';
import { ProductListContainer } from '../../styled/product';
import { ColumnContainer } from '../../styled/shared';

export default function ProductsScreen(props) {
  const { products, store } = props.route.params;

  return (
    <View>
      <NavHeaderContainer withMargin>
        <NavButtonContainer onPress={() => props.navigation.goBack()}>
          <FontAwesome5 name="arrow-left" solid size={24} />
        </NavButtonContainer>
        <NavTitle>{store.storeName}</NavTitle>
      </NavHeaderContainer>
      <ProductListContainer>
        <FlatList
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ flex: 1, justifyContent: 'space-between' }}
          numColumns={2}
          data={products}
          renderItem={({ item }) => (
            <ProductCard
              key={item.id}
              product={item}
              navigation={props.navigation}
              store={store}
              displayPoints
              productsScreen
            />
          )}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => (
            <View style={{ width: 20, height: 20 }} />
          )}
          ListHeaderComponent={
            <ColumnContainer style={{ marginBottom: 20 }}>
              <Title>{`Products (${products.length})`}</Title>
            </ColumnContainer>
          }
          ListFooterComponent={<View style={{ height: 500 }} />}
        />
      </ProductListContainer>
    </View>
  );
}

ProductsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

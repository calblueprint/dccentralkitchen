import { FontAwesome5 } from '@expo/vector-icons';
import * as Analytics from 'expo-firebase-analytics';
import PropTypes from 'prop-types';
import React from 'react';
import { PixelRatio, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import Window from '../../constants/Layout';
import {
  ColumnContainer,
  RowContainer,
  SpaceBetweenRowContainer,
} from '../../styled/shared';
import { StoreDetailText } from '../../styled/store';
import {
  Body,
  ButtonContainer,
  ButtonLabel,
  Subtitle,
} from '../BaseComponents';
import StoreCardMini from '../store/StoreCardMini';
import ProductCard from './ProductCard';

function StoreProducts({ navigation, store, products, showDefaultStore }) {
  // TODO @tommypoa or @anniero98 - move this into shared utils with StoreListScreen
  return (
    <View>
      <StoreCardMini
        store={store}
        key={store.id}
        seeDistance={!showDefaultStore}
      />
      <View>
        <ColumnContainer>
          <SpaceBetweenRowContainer
            style={{ marginTop: 4, marginBottom: 8, marginHorizontal: 16 }}>
            <RowContainer>
              <Subtitle>Products</Subtitle>
              {products.length > 0 && PixelRatio.getFontScale() < 1.2 && (
                <StoreDetailText
                  color={Colors.secondaryText}
                  style={{ marginTop: 2 }}>
                  recently delivered
                </StoreDetailText>
              )}
            </RowContainer>
            <ButtonContainer
              onPress={() => {
                Analytics.logEvent('view_all_products', {
                  store_name: store.storeName,
                  products_in_stock: store.productIds.length,
                });
                navigation.navigate('Products', {
                  products,
                  navigation,
                  store,
                });
              }}>
              {products.length > 0 && (
                <ButtonLabel noCaps>{`See all ${products.length}`}</ButtonLabel>
              )}
            </ButtonContainer>
          </SpaceBetweenRowContainer>
          {store.stocksOtherVendors && (
            <Body style={{ marginHorizontal: 16, marginTop: -8 }}>
              This store regularly stocks additional produce from other vendors.
            </Body>
          )}
        </ColumnContainer>
        <FlatList
          horizontal
          data={products}
          renderItem={({ item }) => (
            <ProductCard
              key={item.id}
              product={item}
              navigation={navigation}
              store={store}
              productsScreen={false}
            />
          )}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <View
              style={{
                alignItems: 'center',
                width: Window.width - 32,
              }}>
              <FontAwesome5
                name="shopping-basket"
                size={64}
                color={Colors.primaryGray}
                style={{ marginBottom: 12 }}
              />
              <Body
                style={{ textAlign: 'center' }}
                color={Colors.secondaryText}>
                No Healthy Corners deliveries in the last 7 days. Check back
                later!
              </Body>
            </View>
          }
          ListHeaderComponent={<View style={{ width: 16 }} />}
          ListFooterComponent={<View style={{ width: 16 }} />}
          ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
        />
      </View>
    </View>
  );
}
StoreProducts.propTypes = {
  products: PropTypes.array.isRequired,
  store: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  showDefaultStore: PropTypes.bool.isRequired,
};

export default StoreProducts;

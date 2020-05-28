import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import Window from '../../constants/Layout';
import { SpaceBetweenRowContainer } from '../../styled/shared';
import { StoreDetailText } from '../../styled/store';
import { Body, ButtonContainer, Subtitle, Title } from '../BaseComponents';
import StoreCard from '../store/StoreCard';
import ProductCard from './ProductCard';

function StoreProducts({ navigation, store, products, showDefaultStore }) {
  // TODO @tommypoa or @anniero98 - move this into shared utils with StoreListScreen
  return (
    <View>
      <StoreCard store={store} key={store.id} seeDistance={!showDefaultStore} />
      <View>
        <SpaceBetweenRowContainer margin={(0, 16)}>
          <View style={{ flexDirection: 'row' }}>
            <Title>Products</Title>
            {products.length > 0 && (
              <StoreDetailText
                color={Colors.secondaryText}
                style={{ marginTop: 7 }}>
                recently delivered
              </StoreDetailText>
            )}
          </View>

          <ButtonContainer
            onPress={() =>
              navigation.navigate('Products', {
                products,
                navigation,
                store,
              })
            }>
            {products.length > 0 && (
              <Subtitle>{`See all ${products.length}`}</Subtitle>
            )}
          </ButtonContainer>
        </SpaceBetweenRowContainer>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
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
              <Body color={Colors.secondaryText}>
                No recent deliveries...check back later!
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

import { FontAwesome5 } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { FlatList, PixelRatio, ScrollView, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import {
  Body,
  ButtonLabel,
  NavHeaderContainer,
  Title,
} from '../../components/BaseComponents';
import ProgramTag from '../../components/store/ProgramTag';
import StoreCard from '../../components/store/StoreCard';
import Colors from '../../constants/Colors';
import { useFilteredStores } from '../../lib/mapUtils';
import { ColumnContainer, RowContainer } from '../../styled/shared';
import { CancelButton, styles } from '../../styled/store';

export default function StoreListScreen(props) {
  const searchRef = useRef(null);
  const [searchStr, setSearchStr] = useState('');
  const [filters, setFilters] = useState({
    openNow: false,
    productsInStock: false,
    snapOrEbtAccepted: false,
    wic: false,
    couponProgramPartner: false,
    rewardsAccepted: false,
  });
  const { stores } = props.route.params;
  const filteredStores = useFilteredStores(stores, searchStr, filters);

  // Focuses the search bar when the screen loads
  useFocusEffect(
    React.useCallback(() => {
      const focusSearch = () => searchRef.current.focus();
      focusSearch();
    }, [])
  );

  const mapTransition = (store) => {
    props.navigation.navigate('Stores', {
      currentStore: store,
    });
  };

  const updateFilters = (name) => {
    setFilters((prevState) => {
      return { ...prevState, [name]: !filters[name] };
    });
  };

  return (
    <View>
      <NavHeaderContainer vertical backgroundColor={Colors.primaryOrange}>
        <ColumnContainer style={{ width: '100%' }}>
          <RowContainer
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CancelButton onPress={() => props.navigation.goBack()}>
              <ButtonLabel color={Colors.lightText}>Cancel</ButtonLabel>
            </CancelButton>
            <Title color={Colors.lightText} style={{ textAlign: 'center' }}>
              Find a store
            </Title>
          </RowContainer>
          <SearchBar
            maxFontSizeMultiplier={1.4}
            autoCapitalize="words"
            autoCorrect={false}
            placeholder="Store name, ZIP, or address"
            onChangeText={(text) => setSearchStr(text)}
            value={searchStr}
            containerStyle={styles.container}
            inputContainerStyle={styles.inputContainer}
            selectionColor={Colors.primaryOrange}
            returnKeyType="search"
            searchIcon={
              <FontAwesome5
                name="search"
                size={16}
                color={Colors.primaryOrange}
              />
            }
            inputStyle={styles.input}
            ref={searchRef}
          />
        </ColumnContainer>
      </NavHeaderContainer>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ height: PixelRatio.getFontScale() < 1.2 ? 52 : 58 }}>
        {/* Filter Chips */}
        <ProgramTag
          program="Open now"
          tag
          selected={filters.openNow}
          selectedFunc={() => {
            updateFilters('openNow');
          }}
        />
        <ProgramTag
          program="Products in stock"
          tag
          selected={filters.productsInStock}
          selectedFunc={() => {
            updateFilters('productsInStock');
          }}
        />
        <ProgramTag
          program="SNAP/EBT"
          tag
          selected={filters.snapOrEbtAccepted}
          selectedFunc={() => {
            updateFilters('snapOrEbtAccepted');
          }}
        />
        <ProgramTag
          program="WIC"
          tag
          selected={filters.wic}
          selectedFunc={() => {
            updateFilters('wic');
          }}
        />
        <ProgramTag
          program="SNAP Match"
          tag
          selected={filters.couponProgramPartner}
          selectedFunc={() => {
            updateFilters('couponProgramPartner');
          }}
        />
        {/* <ProgramTag
          program="Healthy Rewards"
          tag
          selected={filters.rewardsAccepted}
          selectedFunc={() => {
            updateFilters('rewardsAccepted');
          }}
        /> */}
      </ScrollView>
      <FlatList
        data={filteredStores}
        renderItem={({ item }) => (
          <StoreCard
            key={item.id}
            store={item}
            callBack={() => mapTransition(item)}
            storeList
          />
        )}
        keyExtractor={(item) => item.id}
        // 16px top margin from heading
        ListHeaderComponent={<View style={{ height: 16 }} />}
        // 420 bottom margin to make sure all search results show with the keyboard activated.
        ListFooterComponent={<View style={{ height: 420 }} />}
        ListEmptyComponent={
          <View
            style={{
              alignItems: 'center',
              marginTop: 100,
            }}>
            <FontAwesome5
              name="store"
              size={64}
              color={Colors.primaryGray}
              style={{ marginBottom: 12 }}
            />
            <Body color={Colors.secondaryText}>
              No stores matched your search.
            </Body>
          </View>
        }
      />
    </View>
  );
}

StoreListScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

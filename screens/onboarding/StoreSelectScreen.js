import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import {
  Body,
  ButtonContainer,
  ButtonLabel,
  FilledButtonContainer,
  NavHeaderContainer,
  Title,
} from '../../components/BaseComponents';
import StoreSelectCard from '../../components/store/StoreSelectCard';
import Colors from '../../constants/Colors';
import { getCustomerById, updateCustomer } from '../../lib/airtable/request';
import { logErrorToSentry } from '../../lib/logUtils';
import {
  findStoreDistance,
  sortByDistance,
  useCurrentLocation,
  useFilteredStores,
  useStores,
} from '../../lib/mapUtils';
import { ColumnContainer, RowContainer } from '../../styled/shared';
import { styles } from '../../styled/store';

export default function StoreSelectScreen(props) {
  const { locationPermissions, currentLocation } = useCurrentLocation();
  const stores = useStores();
  stores.forEach((store) => {
    const currStore = store;
    currStore.distance = findStoreDistance(currentLocation, store);
  });
  stores.sort((a, b) => sortByDistance(a, b));

  const [selectedStores, setSelectedStores] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchStr, setSearchStr] = useState('');
  const filteredStores = useFilteredStores(stores, searchStr);
  const searchRef = React.useRef(null);

  // Load initial customer info
  useEffect(() => {
    if (stores.length === 0) {
      return;
    }
    const loadCustomer = async () => {
      try {
        const customerId = await AsyncStorage.getItem('customerId');
        const cust = await getCustomerById(customerId);
        const favoriteStores = cust.favoriteStoreIds || [];
        setSelectedStores(favoriteStores);
        setLoading(false);
      } catch (err) {
        console.log('[StoreSelectScreen](loadCustomer) Airtable:', err);
        logErrorToSentry({
          screen: 'StoreSelectScreen',
          action: 'loadCustomer',
          error: err,
        });
      }
    };
    loadCustomer();
  }, [stores]);

  const selectStore = (storeId) => {
    if (selectedStores.includes(storeId)) {
      const newStores = selectedStores.filter((s) => s !== storeId);
      setSelectedStores(newStores);
    } else {
      setSelectedStores([...selectedStores, storeId]);
    }
  };

  const saveFavoriteStores = async () => {
    try {
      const customerId = await AsyncStorage.getItem('customerId');
      await updateCustomer(customerId, {
        favoriteStoreIds: selectedStores,
      });
      await navigatePermissions();
    } catch (err) {
      console.error('[StoreSelectScreen] (saveFavoriteStores) Airtable:', err);
      logErrorToSentry({
        screen: 'StoreSelectScreen',
        action: 'saveFavoriteStores',
        error: err,
      });
    }
  };

  const navigatePermissions = async () => {
    // TODO fix this Non-serializable values were found in the navigation state warning
    props.route.params.updateStep();
    props.navigation.navigate('Permissions');
  };

  return (
    locationPermissions &&
    !isLoading && (
      <View style={{ flex: 1 }}>
        <NavHeaderContainer vertical backgroundColor={Colors.bgLight}>
          <ColumnContainer
            style={{
              width: '100%',
              paddingHorizontal: 8,
            }}>
            <RowContainer
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Title color={Colors.activeText} style={{ textAlign: 'center' }}>
                Select your favorite stores
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
              selectionColor={Colors.primaryGreen}
              returnKeyType="search"
              searchIcon={
                <FontAwesome5
                  name="search"
                  size={16}
                  color={Colors.activeText}
                />
              }
              inputStyle={styles.input}
              ref={searchRef}
            />
          </ColumnContainer>
        </NavHeaderContainer>
        <FlatList
          data={filteredStores}
          renderItem={({ item }) => (
            <StoreSelectCard
              key={item.id}
              store={item}
              favorited={selectedStores.includes(item.id)}
              selectStore={() => selectStore(item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
          // 16px top margin from heading
          ListHeaderComponent={<View style={{ height: 16 }} />}
          // 150 bottom margin to make sure all search results show with the keyboard activated.
          ListFooterComponent={<View style={{ height: 150 }} />}
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
        <View
          style={{
            paddingHorizontal: 24,
            paddingVertical: 12,
            justifyContent: 'flex-end',
            backgroundColor: Colors.lightestGray,
          }}>
          <FilledButtonContainer onPress={() => saveFavoriteStores()}>
            <ButtonLabel color={Colors.lightText}>
              {`Save ${selectedStores.length} store${(selectedStores.length >
                1 &&
                's') ||
                ''}`}
            </ButtonLabel>
          </FilledButtonContainer>
          <ButtonContainer
            style={{ paddingVertical: 12 }}
            onPress={() => navigatePermissions()}>
            <ButtonLabel color={Colors.secondaryText}>
              Skip this step
            </ButtonLabel>
          </ButtonContainer>
        </View>
      </View>
    )
  );
}

StoreSelectScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

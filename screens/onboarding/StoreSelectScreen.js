import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { AsyncStorage, FlatList, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import {
  Body,
  ButtonLabel,
  FilledButtonContainer,
  NavHeaderContainer,
  Title,
} from '../../components/BaseComponents';
import StoreSelectCard from '../../components/store/StoreSelectCard';
import Colors from '../../constants/Colors';
import { updateCustomers } from '../../lib/airtable/request';
import { logErrorToSentry } from '../../lib/logUtils';
import { ColumnContainer, RowContainer } from '../../styled/shared';
import { styles } from '../../styled/store';

export default class StoreSelectScreen extends React.Component {
  constructor(props) {
    super(props);
    const {
      navigation,
      showDefaultStore,
      updateStep,
    } = this.props.route.params;
    this.state = {
      navigation,
      searchStr: '',
      showDefaultStore,
      selectedStores: [],
      updateStep,
    };
  }

  selectStore = (store) => {
    const index = this.state.selectedStores.indexOf(store.id);
    this.setState((state) => {
      let selectedStores;
      if (index > -1) {
        selectedStores = state.selectedStores.filter((_, i) => index !== i);
      } else {
        selectedStores = [...state.selectedStores, store.id];
      }
      return {
        selectedStores,
      };
    });
  };

  filterStore = (searchStr) => {
    return (store) => {
      return (
        store.storeName.toLowerCase().includes(searchStr.toLowerCase()) ||
        store.address.toLowerCase().includes(searchStr.toLowerCase()) ||
        store.zip.includes(searchStr)
      );
    };
  };

  async saveFavoriteStores() {
    try {
      const customerId = await AsyncStorage.getItem('customerId');
      await updateCustomers(customerId, {
        favoriteStoreIds: this.state.selectedStores,
      });
      await this.navigatePermissions();
    } catch (err) {
      console.error('[StoreSelectScreen] (saveFavoriteStores) Airtable:', err);
      logErrorToSentry({
        screen: 'StoreSelectScreen',
        action: 'saveFavoriteStores',
        error: err,
      });
    }
  }

  async navigatePermissions() {
    this.state.updateStep();
    this.state.navigation.navigate('Permissions');
  }

  render() {
    const { stores } = this.props.route.params;
    const { searchStr } = this.state;
    const filteredStores = stores.filter(this.filterStore(searchStr));

    return (
      <View style={{ flex: 1 }}>
        <NavHeaderContainer vertical backgroundColor={Colors.primaryOrange}>
          <ColumnContainer style={{ width: '100%' }}>
            <RowContainer
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Title color={Colors.lightText} style={{ textAlign: 'center' }}>
                {`Choose up to ${5 - this.state.selectedStores.length} stores`}
              </Title>
            </RowContainer>
            <SearchBar
              maxFontSizeMultiplier={1.4}
              autoCapitalize="words"
              autoCorrect={false}
              placeholder="Store name, ZIP, or address"
              onChangeText={(text) => this.setState({ searchStr: text })}
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
              // eslint-disable-next-line no-return-assign
              ref={(search) => (this.search = search)}
            />
          </ColumnContainer>
        </NavHeaderContainer>
        <FlatList
          data={filteredStores}
          renderItem={({ item }) => (
            <StoreSelectCard
              key={item.id}
              store={item}
              selected
              callBack={() => this.selectStore(item)}
              storeList
              seeDistance={!this.state.showDefaultStore}
              selectable
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
            height: 128,
            paddingHorizontal: 24,
            justifyContent: 'space-around',
          }}>
          <FilledButtonContainer onPress={() => this.saveFavoriteStores()}>
            <ButtonLabel>{`Save ${this.state.selectedStores.length} stores`}</ButtonLabel>
          </FilledButtonContainer>
          <FilledButtonContainer onPress={() => this.navigatePermissions()}>
            <ButtonLabel>Skip this step</ButtonLabel>
          </FilledButtonContainer>
        </View>
      </View>
    );
  }
}

StoreSelectScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

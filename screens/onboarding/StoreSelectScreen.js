import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { AsyncStorage, FlatList, View } from 'react-native';
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
import { getCustomersById, updateCustomers } from '../../lib/airtable/request';
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
      isLoading: true,
    };
  }

  async componentDidMount() {
    const customerId = await AsyncStorage.getItem('customerId');
    const cust = await getCustomersById(customerId);
    const favoriteStores = cust.favoriteStoreIds || [];
    this.setState({ selectedStores: favoriteStores });
    this.setState({ isLoading: false });
  }

  selectStore = (storeId) => {
    const index = this.state.selectedStores.indexOf(storeId);
    this.setState((state) => {
      let selectedStores;
      if (index > -1) {
        selectedStores = state.selectedStores.filter((_, i) => index !== i);
      } else {
        selectedStores = [...state.selectedStores, storeId];
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
    if (this.state.isLoading) return null;
    const { stores } = this.props.route.params;
    const { searchStr } = this.state;
    const filteredStores = stores.filter(this.filterStore(searchStr));

    return (
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
              onChangeText={(text) => this.setState({ searchStr: text })}
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
              favorited={this.state.selectedStores.includes(item.id)}
              selectStore={() => this.selectStore(item.id)}
              seeDistance={!this.state.showDefaultStore}
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
          <FilledButtonContainer onPress={() => this.saveFavoriteStores()}>
            <ButtonLabel color={Colors.lightText}>
              {`Save ${this.state.selectedStores.length} stores`}
            </ButtonLabel>
          </FilledButtonContainer>
          <ButtonContainer
            style={{ paddingVertical: 12 }}
            onPress={() => this.navigatePermissions()}>
            <ButtonLabel color={Colors.secondaryText}>
              Skip this step
            </ButtonLabel>
          </ButtonContainer>
        </View>
      </View>
    );
  }
}

StoreSelectScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

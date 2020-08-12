import { FontAwesome5 } from '@expo/vector-icons';
import * as Analytics from 'expo-firebase-analytics';
import PropTypes from 'prop-types';
import React from 'react';
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
import { ColumnContainer, RowContainer } from '../../styled/shared';
import { CancelButton, styles } from '../../styled/store';

export default class SearchStoresScreen extends React.Component {
  constructor(props) {
    super(props);
    const { navigation, showDefaultStore } = this.props.route.params;
    this.state = {
      navigation,
      searchStr: '',
      filters: {
        openNow: false,
        productsInStock: false,
        snapOrEbtAccepted: false,
        wic: false,
        couponProgramPartner: false,
        rewardsAccepted: false,
      },
      showDefaultStore,
    };
    this.searchStrHistory = [];
    this.filterHistory = [];
  }

  componentDidMount() {
    this.search.focus();
  }

  componentWillUnmount() {
    if (this.searchStrHistory.length > 0) {
      Analytics.logEvent('search_stores', {
        search_queries: this.searchStrHistory,
      });
    }
    if (this.filterHistory.length > 0) {
      const { filters } = this.state;
      const selectedFilters = Object.keys(filters)
        .filter((key) => filters[key])
        .reduce((res, key) => Object.assign(res, { [key]: filters[key] }), {});
      Analytics.logEvent('filter_stores', {
        ...selectedFilters,
        filter_history: this.filterHistory,
      });
    }
  }

  // TODO: fix warning involving using a callback function to look up current store.
  // TODO @tommypoa or @anniero98 - move this into shared utils with StoreListScreen
  mapTransition = (store) => {
    this.state.navigation.navigate('Stores', {
      currentStore: store,
    });
  };

  filterStore = (searchStr) => {
    if (searchStr !== '') {
      this.searchStrHistory.push(searchStr);
    }
    return (store) => {
      return (
        store.storeName.toLowerCase().includes(searchStr.toLowerCase()) ||
        store.address.toLowerCase().includes(searchStr.toLowerCase()) ||
        store.zip.includes(searchStr)
      );
    };
  };

  updateFilters = (name) => {
    this.filterHistory.push(name);
    this.setState((prevState) => ({
      filters: { ...prevState.filters, [name]: !prevState.filters[name] },
    }));
  };

  render() {
    const { stores } = this.props.route.params;
    const { filters, searchStr } = this.state;
    let filteredStores = stores.filter(this.filterStore(searchStr));
    const selectedFilters = Object.keys(filters).filter((key) => filters[key]);
    // Only apply filters if at least one is selected
    // Otherwise, apply all that are selected
    if (selectedFilters.length !== 0) {
      filteredStores = filteredStores.filter((store) => {
        return selectedFilters.every((name) => {
          // 'Open Now' is not a boolean property that exists
          if (name === 'openNow') {
            return store.storeOpenStatus.includes('Open');
          }
          return store[name];
        });
      });
    }

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
              <CancelButton onPress={() => this.props.navigation.goBack()}>
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
              placeholder="Search by store name"
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
              this.updateFilters('openNow');
            }}
          />
          <ProgramTag
            program="Products in stock"
            tag
            selected={filters.productsInStock}
            selectedFunc={() => {
              this.updateFilters('productsInStock');
            }}
          />
          <ProgramTag
            program="SNAP/EBT"
            tag
            selected={filters.snapOrEbtAccepted}
            selectedFunc={() => {
              this.updateFilters('snapOrEbtAccepted');
            }}
          />
          <ProgramTag
            program="WIC"
            tag
            selected={filters.wic}
            selectedFunc={() => {
              this.updateFilters('wic');
            }}
          />
          <ProgramTag
            program="SNAP Match"
            tag
            selected={filters.couponProgramPartner}
            selectedFunc={() => {
              this.updateFilters('couponProgramPartner');
            }}
          />
          <ProgramTag
            program="Healthy Rewards"
            tag
            selected={filters.rewardsAccepted}
            selectedFunc={() => {
              this.updateFilters('rewardsAccepted');
            }}
          />
        </ScrollView>
        <FlatList
          data={filteredStores}
          renderItem={({ item }) => (
            <StoreCard
              key={item.id}
              store={item}
              callBack={() => this.mapTransition(item)}
              storeList
              seeDistance={!this.state.showDefaultStore}
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
}

SearchStoresScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};
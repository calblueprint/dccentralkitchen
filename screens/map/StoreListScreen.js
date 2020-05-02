import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
// @tommypoa: Create styled-component for this
import { Chip } from 'react-native-paper';
import {
  Body,
  ButtonLabel,
  Caption,
  NavHeaderContainer,
  Title,
} from '../../components/BaseComponents';
import StoreCard from '../../components/store/StoreCard';
import Colors from '../../constants/Colors';
import { ColumnContainer, RowContainer } from '../../styled/shared';
import { CancelButton, styles } from '../../styled/store';

export default class StoreListScreen extends React.Component {
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
  }

  componentDidMount() {
    this.search.focus();
  }

  // TODO: fix warning involving using a callback function to look up current store.
  // TODO @tommypoa or @anniero98 - move this into shared utils with StoreListScreen
  mapTransition = (store) => {
    this.state.navigation.navigate('Stores', {
      currentStore: store,
    });
  };

  filterStore = (searchStr) => {
    return (store) => {
      return store.storeName.toLowerCase().includes(searchStr.toLowerCase());
    };
  };

  updateFilters = (name) => {
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
                <ButtonLabel color={Colors.lightest}>Cancel</ButtonLabel>
              </CancelButton>
              <Title color={Colors.lightest} style={{ textAlign: 'center' }}>
                Find a store
              </Title>
            </RowContainer>
            <SearchBar
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
          style={{ height: 52 }}>
          {/* Filter Chips */}
          <Chip
            icon={() => (
              <FontAwesome5
                name="clock"
                solid
                size={10}
                color={filters.openNow ? Colors.lightest : Colors.darkerOrange}
                style={{ marginTop: 0 }}
              />
            )}
            textStyle={styles.filterChipText}
            style={
              filters.openNow ? styles.selectedFilterChip : styles.filterChip
            }
            onPress={() => {
              this.updateFilters('openNow');
            }}>
            <Caption
              color={filters.openNow ? Colors.lightest : Colors.darkerOrange}>
              Open now
            </Caption>
          </Chip>
          <Chip
            icon={() => (
              <FontAwesome5
                name="shopping-basket"
                size={10}
                color={
                  filters.productsInStock
                    ? Colors.lightest
                    : Colors.darkerOrange
                }
                style={{ marginTop: 0 }}
              />
            )}
            textStyle={styles.filterChipText}
            style={
              filters.productsInStock
                ? styles.selectedFilterChip
                : styles.filterChip
            }
            onPress={() => {
              this.updateFilters('productsInStock');
            }}>
            <Caption
              color={
                filters.productsInStock ? Colors.lightest : Colors.darkerOrange
              }>
              Products in stock
            </Caption>
          </Chip>
          <Chip
            icon={() => (
              <FontAwesome5
                name="credit-card"
                size={10}
                color={
                  filters.snapOrEbtAccepted
                    ? Colors.lightest
                    : Colors.darkerOrange
                }
                style={{ marginTop: 0 }}
              />
            )}
            textStyle={styles.filterChipText}
            style={
              filters.snapOrEbtAccepted
                ? styles.selectedFilterChip
                : styles.filterChip
            }
            onPress={() => {
              this.updateFilters('snapOrEbtAccepted');
            }}>
            <Caption
              color={
                filters.snapOrEbtAccepted
                  ? Colors.lightest
                  : Colors.darkerOrange
              }>
              EBT
            </Caption>
          </Chip>

          <Chip
            icon={() => (
              <FontAwesome5
                name="heart"
                size={10}
                color={filters.wic ? Colors.lightest : Colors.darkerOrange}
                style={{ marginTop: 0 }}
              />
            )}
            textStyle={styles.filterChipText}
            style={filters.wic ? styles.selectedFilterChip : styles.filterChip}
            onPress={() => {
              this.updateFilters('wic');
            }}>
            <Caption
              color={filters.wic ? Colors.lightest : Colors.darkerOrange}>
              WIC
            </Caption>
          </Chip>

          <Chip
            icon={() => (
              <FontAwesome5
                name="carrot"
                size={10}
                color={
                  filters.couponProgramPartner
                    ? Colors.lightest
                    : Colors.darkerOrange
                }
                style={{ marginTop: 0 }}
              />
            )}
            textStyle={styles.filterChipText}
            style={
              filters.couponProgramPartner
                ? styles.selectedFilterChip
                : styles.filterChip
            }
            onPress={() => {
              this.updateFilters('couponProgramPartner');
            }}>
            <Caption
              color={
                filters.couponProgramPartner
                  ? Colors.lightest
                  : Colors.darkerOrange
              }>
              SNAP Match
            </Caption>
          </Chip>
          <Chip
            icon={() => (
              <FontAwesome5
                name="star"
                solid
                size={10}
                color={
                  filters.rewardsAccepted
                    ? Colors.lightest
                    : Colors.darkerOrange
                }
                style={{ marginTop: 0 }}
              />
            )}
            textStyle={styles.filterChipText}
            style={
              filters.rewardsAccepted
                ? styles.selectedFilterChip
                : styles.filterChip
            }
            onPress={() => {
              this.updateFilters('rewardsAccepted');
            }}>
            <Caption
              color={
                filters.rewardsAccepted ? Colors.lightest : Colors.darkerOrange
              }>
              Healthy Rewards
            </Caption>
          </Chip>
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
                color={Colors.base}
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

StoreListScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

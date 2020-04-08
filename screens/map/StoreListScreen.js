import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { FlatList, View } from 'react-native';
import { SearchBar } from 'react-native-elements'; // @tommypoa: Create styled-component for this
import {
  Body,
  ButtonLabel,
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
    const { navigation, stores } = this.props.route.params;
    this.state = {
      allStores: stores,
      navigation,
      searchStr: '',
      filteredStores: stores,
    };
  }

  componentDidMount() {
    this.search.focus();
  }

  // TODO: fix warning involving using a callback function to look up current store.
  // TODO @tommypoa or @anniero98 - move this into shared utils with StoreListScreen
  storeDetailsTransition = store => {
    this.state.navigation.navigate('Stores', {
      currentStore: store,
    });
  };

  updateSearch = searchStr => {
    this.setState({
      searchStr,
      filteredStores: this.state.allStores.filter(this.filterStore(searchStr)),
    });
  };

  filterStore = searchStr => {
    return store => {
      return store.storeName.toLowerCase().includes(searchStr.toLowerCase());
    };
  };

  render() {
    const { searchStr } = this.state;

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
              onChangeText={this.updateSearch}
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
              ref={search => (this.search = search)}
            />
          </ColumnContainer>
        </NavHeaderContainer>
        <FlatList
          data={this.state.filteredStores}
          renderItem={({ item }) => (
            <StoreCard
              key={item.id}
              store={item}
              callBack={() => this.storeDetailsTransition(item)}
              seeProduct
            />
          )}
          keyExtractor={item => item.id}
          // 16px top margin from heading
          ListHeaderComponent={<View style={{ height: 16 }} />}
          // 400 bottom margin to make sure all search results show with the keyboard activated.
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

import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { SearchBar } from 'react-native-elements'; // @tommypoa: Create styled-component for this
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../../assets/Colors';
import StoreCard from '../../components/store/StoreCard';
import {
  StoreListContainer,
  StoreListHeaderContainer,
  StoreListTitle,
  styles,
} from '../../styled/store';

class StoreListScreen extends React.Component {
  constructor(props) {
    super(props);
    const { stores, navigation } = this.props.navigation.state.params;
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

  filterStore(searchStr) {
    return store => {
      return store.storeName.toLowerCase().includes(searchStr.toLowerCase());
    };
  }

  render() {
    const { searchStr } = this.state;

    return (
      <View>
        <StoreListHeaderContainer>
          <StoreListTitle>Find a store</StoreListTitle>
          {/* Search bar */}
          <SearchBar
            placeholder="Search by store name"
            onChangeText={this.updateSearch}
            value={searchStr}
            containerStyle={styles.container}
            inputContainerStyle={styles.inputContainer}
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
        </StoreListHeaderContainer>
        <StoreListContainer>
          <ScrollView showsVerticalScrollIndicator={false}>
            {this.state.filteredStores.map(store => (
              <StoreCard
                key={store.id}
                store={store}
                callBack={() => this.storeDetailsTransition(store)}
                seeProduct
              />
            ))}
          </ScrollView>
        </StoreListContainer>
      </View>
    );
  }
}

export default StoreListScreen;

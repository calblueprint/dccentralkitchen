import React from 'react';
import { SearchBar } from 'react-native-elements'; // @tommypoa: Create styled-component for this
import { ScrollView } from 'react-native-gesture-handler';
import StoreCard from '../../components/store/StoreCard';
import { Title } from '../../components/BaseComponents';
import {
  StoreModal,
  StoreListHeaderContainer,
  StoreListTitle,
  styles
} from '../../styled/store';
import { View } from 'react-native';

class StoreListScreen extends React.Component {
  constructor(props) {
    super(props);
    const { stores, navigation } = this.props.navigation.state.params;
    this.state = {
      allStores: stores,
      navigation,
      searchStr: '',
      filteredStores: stores
    };
  }

  // TODO @tommypoa or @anniero98 - move this into shared utils with StoreListScreen
  storeDetailsTransition = store => {
    this.state.navigation.navigate('Stores', {
      currentStore: store
    });
  };

  updateSearch = searchStr => {
    this.setState({
      searchStr,
      filteredStores: this.state.allStores.filter(this.filterStore(searchStr))
    });
  };

  filterStore(searchStr) {
    return store => {
      return store.name.toLowerCase().includes(searchStr.toLowerCase());
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
            searchIcon={styles.searchIcon}
            inputStyle={styles.input}
          />
        </StoreListHeaderContainer>
        <StoreModal>
          <Title>Store List</Title>
          <ScrollView>
            {this.state.filteredStores.map(store => (
              <StoreCard
                key={store.id}
                store={store}
                callBack={() => this.storeDetailsTransition(store)}
              />
            ))}
          </ScrollView>
        </StoreModal>
      </View>
    );
  }
}

export default StoreListScreen;

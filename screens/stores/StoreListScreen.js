import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';

import StoreCard from '../../components/StoreCard';
import { Title } from '../../styles/shared';
import { StoreModal } from '../../styles/stores';

class StoreListScreen extends React.Component {
  constructor(props) {
    super(props);
    const { stores, navigation } = this.props.navigation.state.params;
    this.state = { stores, navigation, search: '', searchStores: stores };
  }

  detailedStoreTransition = store => {
    this.state.navigation.navigate('Stores', {
      currentStore: store
    });
  };

  updateSearch = search => {
    this.setState({
      search,
      searchStores: this.state.stores.filter(this.filterStore(search))
    });
  };

  filterStore(search) {
    return store => {
      return store.name.toLowerCase().includes(search.toLowerCase());
    };
  }

  render() {
    const { search } = this.state;

    return (
      <StoreModal>
        {/* Search bar */}
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={search}
        />
        <Title>Store List</Title>
        <ScrollView>
          {this.state.searchStores.map(store => (
            <StoreCard
              key={store.id}
              store={store}
              callBack={() => this.detailedStoreTransition(store)}
            />
          ))}
        </ScrollView>
      </StoreModal>
    );
  }
}

export default StoreListScreen;

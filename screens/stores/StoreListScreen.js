import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { StoreModal } from '../../styles/stores';
import StoreCard from '../../components/StoreCard';
import { Title } from '../../styles/shared';

class StoreListScreen extends React.Component {
  constructor(props) {
    super(props);
    const { stores, navigation } = this.props.navigation.state.params;
    this.state = { stores, navigation };
  }

  detailedStoreTransition = store => {
    this.state.navigation.navigate('StoresDetailed', {
      currentStore: store
    });
  };

  render() {
    return (
      <StoreModal>
        <Title>Store List</Title>
        <ScrollView>
          {this.state.stores.map(store => (
            <StoreCard
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

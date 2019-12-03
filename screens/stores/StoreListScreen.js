import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import StoreCard from '../../components/StoreCard';
import { Title } from '../../styles/shared';
import { StoreModal } from '../../styles/stores';

class StoreListScreen extends React.Component {
  constructor(props) {
    super(props);
    const { stores, navigation } = this.props.navigation.state.params;
    this.state = { stores, navigation };
<<<<<<< HEAD
    console.log(this.state.stores);
=======
>>>>>>> 7a0f0f11bbcde748a20b7ff099611601d15acb70
  }

  detailedStoreTransition = store => {
    this.state.navigation.navigate('Stores', {
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

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import BottomSheet from 'reanimated-bottom-sheet';

import StoreCard from '../components/StoreCard';
import BASE from '../lib/common';
import { StoreModalBar, styles, Title } from '../styles';
import StoreProducts from '../components/StoreProducts';

const storesTable = BASE('Stores').select({ view: 'Grid view' });
let stores;
function createStoreData(record) {
  const data = record.fields;
  return {
    name: data['Store Name'],
    id: data.id,
    latitude: data.Latitude,
    longitude: data.Longitude,
    hours: data['Store Hours'],
    address: data.Address,
    products: data.Products
  };
}
// The state is initially populated with stores by calling the Airtable API to get all store records
// We transform them to a JS object via the createStoreData method

storesTable.firstPage((err, records) => {
  // TODO @tommypoa fetch all pages
  if (err) {
    console.error(err);
    return;
  }
  stores = records.map(record => createStoreData(record));
});

const initialRegion = {
  latitude: 38.905548,
  longitude: -77.036623,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};

class StoresScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: initialRegion,
      stores,
      store: stores[0]
    };
  }

  renderHeader = () => (
    // TODO @tommypoa Favourites functionality
    <View style={styles.storesModal}>
      <StoreModalBar />
    </View>
  );

  renderInner = () => {
    return (
      <View style={styles.storesModal}>
        <StoreCard
          store={this.state.store}
          key={this.state.store.id}
          callBack={() => this.detailedStoreTransition(this.state.store)}
        />
        <StoreProducts
          navigation={this.props.navigation}
          store={this.state.store}
        />
      </View>
    );
  };

  onRegionChange = region => {
    this.setState({ region });
  };

  detailedStoreTransition = store => {
    this.props.navigation.navigate('StoresDetailed', {
      currentStore: store
    });
  };

  changeCurrentStore = store => {
    this.setState({
      store
    });
  };

  render() {
    return (
      <View style={{ ...StyleSheet.absoluteFillObject }}>
        <MapView
          style={{ flex: 100 }}
          region={this.state.region}
          onRegionChange={this.onRegionChange}>
          {this.state.stores.map(store => (
            <Marker
              key={store.id}
              coordinate={{
                latitude: store.latitude,
                longitude: store.longitude
              }}
              title={store.name}
              description={store.name}
              onPress={() => this.changeCurrentStore(store)}
            />
          ))}
        </MapView>
        <View style={{ flex: 1 }}>
          <BottomSheet
            initialSnap={1}
            enabledInnerScrolling={true}
            enabledGestureInteraction={true}
            snapPoints={['200%', '50%', '10%']}
            renderContent={this.renderInner}
            renderHeader={this.renderHeader}
          />
        </View>
      </View>
    );
  }
}

export default StoresScreen;

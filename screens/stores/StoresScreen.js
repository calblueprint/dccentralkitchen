import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import React from 'react';
import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import BottomSheet from 'reanimated-bottom-sheet';

import StoreCard from '../../components/StoreCard';
import BASE from '../../lib/common';
import { StoreModalBar, styles, Title } from '../../styles';

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
    address: data.Address
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

const deltas = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};

class StoresScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationErrorMsg: null,
      region: null,
      stores
    };
  }

  findCurrentLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      this.setState({
        locationErrorMsg: 'Permission to access location was denied'
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      ...deltas
    };
    await this.setState({ region });
  };

  renderHeader = () => (
    // TODO @tommypoa Favourites functionality
    <View style={styles.storesModal}>
      <StoreModalBar />
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Title>Nearby</Title>
        {/* <Title>Favourites</Title> */}
      </View>
    </View>
  );

  renderInner = () => (
    <View style={styles.storesModal}>
      <View>
        <ScrollView>
          {this.state.stores.map((store) => (
            <StoreCard
              store={store} key={store.id}
              callBack={() => this.detailedStoreTransition(store)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );

  onRegionChange = region => {
    this.setState({ region });
  };

  detailedStoreTransition = store => {
    this.props.navigation.navigate('StoresDetailed', {
      currentStore: store
    });
  };

  render() {
    let text = '';

    if (this.state.locationErrorMsg) {
      text = this.state.locationErrorMsg;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }
    return (
      <SafeAreaView style={{ ...StyleSheet.absoluteFillObject }}>
        <TouchableOpacity onPress={this.findCurrentLocationAsync}>
          <Text> Tap for Location </Text>
          <Text>{text}</Text>
        </TouchableOpacity>
        <MapView
          style={{ flex: 100 }}
          region={this.state.region}
          onRegionChange={this.onRegionChange}>
          {this.state.stores.map(store => (
            <Marker key={store.id}
              coordinate={{
                latitude: store.latitude,
                longitude: store.longitude
              }}
              title={store.name}
              description={store.name}
              onPress={() => this.detailedStoreTransition(store)}
            />
          ))}
        </MapView>
        <View style={{ flex: 1 }}>
          <BottomSheet
            initialSnap={1}
            enabledInnerScrolling={true}
            enabledGestureInteraction={true}
            snapPoints={['80%', '40%', '10%']}
            renderContent={this.renderInner}
            renderHeader={this.renderHeader}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default StoresScreen;

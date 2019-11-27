import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, { Marker } from 'react-native-maps';
import BottomSheet from 'reanimated-bottom-sheet';

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { getStoreData } from './storeHelpers';

import StoreCard from '../../components/StoreCard';
import StoreProducts from '../../components/StoreProducts';
import { StoreModal, StoreModalBar } from '../../styles/stores';

const deltas = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};

export default class StoresScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationErrorMsg: null,
      region: null,
      stores: null,
      store: null
    };
  }

  componentDidMount() {
    // The state is initially populated with stores by calling the Airtable API to get all store records
    this._populateStores();
    this._findCurrentLocationAsync();
  }

  _populateStores = async () => {
    try {
      const stores = await getStoreData();
      // Set initial store to first store for now; calculate distance next
      if (stores) {
        await this.setState({ stores, store: stores[0] });
      }
    } catch (err) {
      console.err(err);
    }
  };

  _findCurrentLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      this.setState({
        locationErrorMsg: 'Permission to access location was denied'
      });
    } else {
      const location = await Location.getCurrentPositionAsync({});
      const region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        ...deltas
      };
      await this.setState({ region });
    }
  };

  renderHeader = () => (
    // TODO @tommypoa Favourites functionality
    <StoreModal>
      <StoreModalBar />
    </StoreModal>
  );

  renderContent = () => {
    return (
      <StoreModal>
        <StoreCard
          store={this.state.store}
          key={this.state.store.id}
          callBack={() => this.detailedStoreTransition(this.state.store)}
        />
        <StoreProducts
          navigation={this.props.navigation}
          store={this.state.store}
        />
      </StoreModal>
    );
  };

  onRegionChangeComplete = region => {
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
    let text = '';

    if (this.state.locationErrorMsg) {
      text = this.state.locationErrorMsg;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }

    // If populateStores has not finished, return nothing
    if (!this.state.stores) {
      return <View />;
    }
    return (
      <SafeAreaView style={{ ...StyleSheet.absoluteFillObject }}>
        <TouchableOpacity onPress={this._findCurrentLocationAsync}>
          {!this.state.locationErrorMsg && (
            <View>
              <Text> Tap for Location </Text>
              <Text>{text}</Text>
            </View>
          )}
        </TouchableOpacity>
        <MapView
          style={{ flex: 100 }}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}>
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
            enabledInnerScrolling
            enabledGestureInteraction
            snapPoints={['200%', '50%', '10%']}
            renderContent={this.renderContent}
            renderHeader={this.renderHeader}
          />
        </View>
      </SafeAreaView>
    );
  }
}

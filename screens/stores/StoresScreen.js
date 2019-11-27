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
import { getStoreData, getProductData } from './storeHelpers';
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
      location: null,
      region: null,
      stores: null,
      store: null,
      storeProducts: null
    };
  }

  componentDidMount() {
    // The state is initially populated with stores by calling the Airtable API to get all store records
    this._populateInitialStoresProducts();
    this._findCurrentLocationAsync();
  }

  _populateInitialStoresProducts = async () => {
    getStoreData()
      // Set initial store to first store for now; TODO calculate distances and sort by closest to location
      .then(stores => {
        this.setState({ stores, store: stores[0] });
        // Once we choose a initial store, we must populate store products here; better to perform API calls at top level, then pass data as props.
        this._populateStoreProducts(stores[0]);
      })
      .catch(err => console.error(err));
  };

  _populateStoreProducts = async store => {
    try {
      const products = await getProductData(store);
      // Set initial store to first store for now; calculate distance next
      if (products) {
        await this.setState({ storeProducts: products });
      }
    } catch (err) {
      console.error(err);
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
      this.setState({ locationErrorMsg: '', location, region });
    }
  };

  renderHeader = () => (
    // TODO @tommypoa Favourites functionality
    <StoreModal>
      <StoreModalBar />
    </StoreModal>
  );

  renderContent = () => {
    console.log('current store :', this.state.store);
    return (
      <StoreModal>
        <StoreProducts
          navigation={this.props.navigation}
          store={this.state.store}
          products={this.state.storeProducts}
        />
      </StoreModal>
    );
  };

  onRegionChangeComplete = region => {
    this.setState({ region });
  };

  // Since we must now also populate the current store products at the top level,
  // we make this an async function and call this._populateStoreProducts
  async changeCurrentStore(store) {
    this.setState({
      store
    });
    await this._populateStoreProducts(store);
  }

  render() {
    let text = '';

    if (this.state.locationErrorMsg) {
      text = this.state.locationErrorMsg;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }

    // If populateStores has not finished, return nothing
    if (!this.state.stores || !this.state.storeProducts) {
      return <View />;
    }
    return (
      <SafeAreaView style={{ ...StyleSheet.absoluteFillObject }}>
        {/* Janky way to do a conditional rendering */}
        {this.state.locationErrorMsg !== '' && (
          <TouchableOpacity onPress={this._findCurrentLocationAsync}>
            <View>
              <Text> Tap to center on current location </Text>
              <Text>{text}</Text>
            </View>
          </TouchableOpacity>
        )}
        {/* Display Map */}
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
        {/* Display bottom sheet */}
        <View style={{ flex: 1 }}>
          <BottomSheet
            initialSnap={1}
            enabledInnerScrolling
            enabledGestureInteraction
            snapPoints={['200%', '50%', '10%']}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
          />
        </View>
      </SafeAreaView>
    );
  }
}

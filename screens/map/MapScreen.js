import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import convertDistance from 'geolib/es/convertDistance';
import getDistance from 'geolib/es/getDistance';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BottomSheet from 'reanimated-bottom-sheet';
import Hamburger from '../../components/Hamburger';
import StoreProducts from '../../components/product/StoreProducts';
import { getProductData, getStoreData } from '../../lib/mapUtils';
import { Body, ButtonLabel } from '../../components/BaseComponents';
import {
  SearchBar,
  BottomSheetContainer,
  BottomSheetHeaderContainer,
  StoreModalBar
} from '../../styled/store';
import { InLineContainer } from '../../styled/shared';

const { width } = Dimensions.get('window'); // full width

const deltas = {
  latitudeDelta: 0.01,
  longitudeDelta: 0.01
};

const initialRegion = {
  latitude: 38.905548,
  longitude: -77.036623,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO don't need this error message rly
      locationErrorMsg: null,
      location: null,
      region: initialRegion,
      stores: null,
      store: null,
      storeProducts: null
    };
  }

  componentDidMount() {
    // We get current location first, since we need to use the lat/lon found in _populateIntitialStoresProducts
    this._findCurrentLocationAsync();
    this._populateInitialStoresProducts();
  }

  componentWillReceiveProps(nextProps) {
    const store = nextProps.navigation.state.params.currentStore;
    this.changeCurrentStore(store);
    const region = {
      latitude: store.latitude,
      longitude: store.longitude,
      ...deltas
    };
    this.setState({ region });
  }

  // Asks for permission if necessary, then gets current location
  _findCurrentLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    // Error message not checked anywhere
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
      this.setState({ locationErrorMsg: null, location, region });
    }
  };

  // The state is initially populated with stores by calling the Airtable API to get all store records
  _populateInitialStoresProducts = async () => {
    getStoreData()
      .then(async stores => {
        // If stores exist, we should order them by distance to our current location.
        await this._orderStoresByDistance(stores);
      })
      .catch(err => console.error(err));
  };

  _populateStoreProducts = async store => {
    try {
      const products = await getProductData(store);
      if (products) {
        this.setState({ storeProducts: products });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Calculate distances and sort by closest to location
  // _findCurrentLocationAsync populates this.state.region with the correct lat/lon
  // Since it's initially set to a default value, we use that instead of this.state.location
  _orderStoresByDistance = async stores => {
    const sortedStores = [];
    const latlng = this.state.region;

    // We need distance to display in the StoreList
    stores.forEach(store => {
      const currStore = store;
      const distanceMeters = getDistance(latlng, store);
      // Convert distance to 'x.xx' form, in miles units
      currStore.distance = convertDistance(distanceMeters, 'mi').toFixed(2);
      sortedStores.push(currStore);
    });
    // sorts in place
    sortedStores.sort(function compare(a, b) {
      return a.distance - b.distance;
    });
    this.setState({ stores: sortedStores, store: sortedStores[0] });

    // Once we choose the closest store, we must populate store products here
    // Better to perform API calls at top level, and then pass data as props.
    await this._populateStoreProducts(stores[0]);
  };

  renderHeader = () => (
    // TODO @tommypoa Favourites functionality
    <BottomSheetHeaderContainer>
      <StoreModalBar />
    </BottomSheetHeaderContainer>
  );

  renderContent = () => {
    return (
      <BottomSheetContainer>
        <Body>Showing products for</Body>
        <StoreProducts
          navigation={this.props.navigation}
          store={this.state.store}
          products={this.state.storeProducts}
        />
      </BottomSheetContainer>
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
    let coords = null;
    if (this.state.location) {
      coords = this.state.location.coords;
    }

    // If populateStores has not finished, return nothing
    if (!this.state.stores || !this.state.storeProducts) {
      return <View />;
    }
    return (
      <SafeAreaView style={{ ...StyleSheet.absoluteFillObject }}>
        <Hamburger navigation={this.props.navigation} />
        {/* Display Map */}
        <MapView
          style={{ flex: 100 }}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}>
          {/* Display search bar */}
          <SearchBar
            onPress={() =>
              this.props.navigation.navigate('StoreList', {
                stores: this.state.stores,
                navigation: this.props.navigation
              })
            }>
            <InLineContainer>
              <FontAwesome
                name="search"
                size={12}
                style={{ color: '#f07723' }}
              />
              <ButtonLabel>Find a store</ButtonLabel>
            </InLineContainer>
          </SearchBar>
          {/* Display store markers */}
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
          {/* If current location found, show current location marker */}
          {this.state.location && (
            <Marker
              key={coords.latitude
                .toString()
                .concat(coords.longitude.toString())}
              coordinate={coords}
              title="Your Location"
              pinColor="#166e00"
            />
          )}
        </MapView>
        {/* Display bottom sheet. 
            snapPoints: Params representing the resting positions of the bottom sheet relative to the bottom of the screen. 
            500% set as a high upper boundary to prevent users from allowing sheet to reach that point */}
        <View style={{ flex: 1, marginBottom: 180 }}>
          <BottomSheet
            initialSnap={1}
            enabledInnerScrolling
            enabledGestureInteraction
            snapPoints={['500%', '45%', '10%']}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
          />
        </View>
        <TouchableOpacity
          style={{
            position: 'absolute',
            height: 80,
            bottom: 0,
            backgroundColor: '#008550',
            alignSelf: 'stretch',
            width,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onPress={() => this.props.navigation.navigate('Rewards')}>
          <View>
            <Text style={{ color: 'white' }}> Your rewards </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

MapScreen.navigationOptions = {
  headerShown: false
};

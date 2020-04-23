import { FontAwesome5 } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import convertDistance from 'geolib/es/convertDistance';
import getDistance from 'geolib/es/getDistance';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Alert,
  AsyncStorage,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BottomSheet from 'reanimated-bottom-sheet';
import { NavHeaderContainer, Subhead } from '../../components/BaseComponents';
import CenterLocation from '../../components/CenterLocation';
import Hamburger from '../../components/Hamburger';
import StoreProducts from '../../components/product/StoreProducts';
import StoreMarker from '../../components/store/StoreMarker';
import Colors from '../../constants/Colors';
import Window from '../../constants/Layout';
import RecordIds from '../../constants/RecordIds';
import { getProductData, getStoreData } from '../../lib/mapUtils';
import {
  BottomSheetContainer,
  BottomSheetHeaderContainer,
  DragBar,
  SearchBar,
} from '../../styled/store';

const minSnapPoint = 185;
const midSnapPoint = 325;
const maxSnapPoint = 488;

const deltas = {
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const initialRegion = {
  latitude: 38.905548,
  longitude: -77.036623,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locationErrorMsg: null,
      location: null,
      region: initialRegion,
      stores: null,
      store: null,
      storeProducts: null,
      showDefaultStore: false,
    };
  }

  async componentDidMount() {
    // We get current location first, since we need to use the lat/lon found in _populateIntitialStoresProducts
    AsyncStorage.clear();
    await this._findCurrentLocation();
    await this._populateInitialStoresProducts();
  }

  // TODO pretty high chance this should be either handled by navigation or `getDerivedStateFromProps`
  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    const store = nextProps.route.params.currentStore;
    const resetSheet = true;
    this.changeCurrentStore(store, resetSheet);
    const region = {
      latitude: store.latitude,
      longitude: store.longitude,
      ...deltas,
    };
    this.setState({ region });
  }

  // Asks for permission if necessary, then gets current location
  _findCurrentLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    // Error message not checked anywhere
    if (status !== 'granted') {
      Alert.alert(
        'Location Error',
        'We are unable to get your location. Enable your location services for this app and try again when your network refreshes.'
      );
      this.setState({
        locationErrorMsg: 'Permission to access location was denied',
      });
    } else {
      const location = await Location.getCurrentPositionAsync({});
      const region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        ...deltas,
      };
      // Don't re-animate if we're using the default store
      if (this._map && !this.state.showDefaultStore) {
        this._map.animateToRegion(region, 1000);
        this.setState({ locationErrorMsg: null, location });
      } else {
        this.setState({ locationErrorMsg: null, location, region });
      }
    }
  };

  // The state is initially populated with stores by calling the Airtable API to get all store records
  _populateInitialStoresProducts = async () => {
    try {
      const stores = await getStoreData();
      // Sets list of stores in state, populates initial products
      await this._orderStoresByDistance(stores);
      // Once we choose the closest store, we must populate its store products
      // Better to perform API calls at top level, and then pass data as props.
      await this._populateStoreProducts(this.state.store);
    } catch (err) {
      console.error(
        '[MapScreen] (_populateInitialStoresProducts) Airtable:',
        err
      );
    }
  };

  _populateStoreProducts = async (store) => {
    try {
      const products = await getProductData(store);
      if (products) {
        this.setState({ storeProducts: products });
      }
    } catch (err) {
      console.error('[MapScreen] (_populateStoreProducts) Airtable:', err);
    }
  };

  // Calculate distances and sort by closest to location
  // _findCurrentLocation populates this.state.region with the correct lat/lon
  // Since it's initially set to a default value, we use that instead of this.state.location
  _orderStoresByDistance = async (stores) => {
    const sortedStores = [];
    const latlng = this.state.region;

    // We need distance to display in the StoreList
    stores.forEach((store) => {
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

    const defaultStore = stores.find((store) => {
      return store.id === RecordIds.defaultStoreId;
    });

    const region = {
      latitude: defaultStore.latitude,
      longitude: defaultStore.longitude,
      ...deltas,
    };

    // Condition for showDefaultStore requires prevState, so a little messy
    this.setState((prevState) => ({
      stores: sortedStores,
      store:
        prevState.locationErrorMsg || sortedStores[0].distance > 100
          ? defaultStore
          : sortedStores[0],
      showDefaultStore:
        prevState.locationErrorMsg || sortedStores[0].distance > 100,
      region:
        prevState.locationErrorMsg || sortedStores[0].distance > 100
          ? region
          : prevState.region,
    }));
  };

  renderHeader = () => (
    // TODO @tommypoa Favourites functionality
    <BottomSheetHeaderContainer>
      <DragBar />
    </BottomSheetHeaderContainer>
  );

  renderContent = () => {
    return (
      <BottomSheetContainer>
        <Subhead
          style={{ margin: 16, marginBottom: 0 }}
          color={Colors.secondaryText}>
          Browsing healthy products at
        </Subhead>
        <StoreProducts
          navigation={this.props.navigation}
          store={this.state.store}
          products={this.state.storeProducts}
          showDefaultStore={this.state.showDefaultStore}
        />
      </BottomSheetContainer>
    );
  };

  onRegionChangeComplete = (region) => {
    this.setState({ region });
  };

  // Update current store and its products
  // Only called after initial store has been set
  // Only expand the bottom sheet to display products if navigated from 'See Products' button on StoreList
  changeCurrentStore(store, resetSheet = false) {
    // Set store focus status
    this.state.store.focused = false;
    // eslint-disable-next-line no-param-reassign
    store.focused = true;

    // Animate to new store region
    const region = {
      latitude: store.latitude,
      longitude: store.longitude,
      ...deltas,
    };
    this.setState(
      {
        store,
      },
      async () => {
        if (resetSheet) {
          this.bottomSheetRef.snapTo(0);
        }
        await this._populateStoreProducts(store);
        await this._map.animateToRegion(region, 1000);
      }
    );
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
      <View style={StyleSheet.absoluteFillObject}>
        <NavHeaderContainer
          noShadow
          backgroundColor="transparent"
          style={{
            zIndex: 1,
          }}>
          <Hamburger navigation={this.props.navigation} />
          {/* Display search bar */}
          <SearchBar
            style={{ flex: 1 }}
            onPress={() =>
              this.props.navigation.navigate('StoreList', {
                stores: this.state.stores,
                navigation: this.props.navigation,
                showDefaultStore: this.state.showDefaultStore,
              })
            }>
            <FontAwesome5
              name="search"
              size={16}
              color={Colors.primaryOrange}
            />
            <Subhead color={Colors.secondaryText} style={{ marginLeft: 8 }}>
              Find a store
            </Subhead>
          </SearchBar>
        </NavHeaderContainer>
        <CenterLocation
          callBack={async () => {
            await this._findCurrentLocation();
            await this._orderStoresByDistance(this.state.stores);
          }}
        />
        {/* Display Map */}
        <MapView
          style={{
            marginTop: -170,
            flex: 100,
            overflow: 'visible',
            zIndex: -1,
          }}
          ref={(mapView) => {
            this._map = mapView;
          }}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}>
          {/* Display store markers */}
          {this.state.stores.map((store) => (
            <Marker
              key={store.id}
              coordinate={{
                latitude: store.latitude,
                longitude: store.longitude,
              }}
              onPress={() => this.changeCurrentStore(store)}>
              <StoreMarker
                storeName={store.storeName}
                focused={store.focused}
              />
            </Marker>
          ))}
          {/* If current location found, show current location marker */}
          {this.state.location && (
            <Marker
              key={coords.latitude
                .toString()
                .concat(coords.longitude.toString())}
              coordinate={coords}
              image={require('../../assets/images/Current_Location.png')}
            />
          )}
        </MapView>
        {/* Display bottom sheet. 
            snapPoints: Params representing the resting positions of the bottom sheet relative to the bottom of the screen. */}
        <View style={{ flex: 1, marginBottom: 20 }}>
          <BottomSheet
            initialSnap={1}
            enabledInnerScrolling={false}
            enabledBottomClamp
            overdragResistanceFactor={1}
            enabledContentTapInteraction={false}
            snapPoints={[maxSnapPoint, midSnapPoint, minSnapPoint]}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            // eslint-disable-next-line no-return-assign
            ref={(bottomSheetRef) => (this.bottomSheetRef = bottomSheetRef)}
          />
        </View>
        <TouchableOpacity
          style={{
            position: 'absolute',
            height: 70,
            bottom: 0,
            backgroundColor: Colors.primaryGreen,
            alignSelf: 'stretch',
            width: Window.width,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onPress={() => this.props.navigation.navigate('RewardsOverlay')}>
          <View>
            <Subhead color="#fff"> Healthy Rewards </Subhead>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

MapScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

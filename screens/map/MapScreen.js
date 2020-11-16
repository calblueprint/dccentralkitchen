import { FontAwesome5 } from '@expo/vector-icons';
import * as Analytics from 'expo-firebase-analytics';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { PixelRatio, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BottomSheet from 'reanimated-bottom-sheet';
import {
  ButtonContainer,
  NavHeaderContainer,
  Subtitle,
} from '../../components/BaseComponents';
import CenterLocation from '../../components/CenterLocation';
import Hamburger from '../../components/Hamburger';
import StoreProducts from '../../components/product/StoreProducts';
import RewardsFooter from '../../components/rewards/RewardsFooter';
import StoreMarker from '../../components/store/StoreMarker';
import Colors from '../../constants/Colors';
import Window from '../../constants/Layout';
import { initialRegion } from '../../constants/Map';
import { logErrorToSentry } from '../../lib/logUtils';
import {
  deltas,
  findDefaultStore,
  getProductData,
  getStoreData,
  orderStoresByDistance,
} from '../../lib/mapUtils';
import {
  BottomSheetContainer,
  BottomSheetHeaderContainer,
  DragBar,
  SearchBar,
} from '../../styled/store';

const snapPoints = [185, 325, 488];

// function useOrderStoresByDistance(props) {
//   const [locationErrorMsg, setlocationErrorMsg] = useState('');
//   const [region, setRegion] = useState(initialRegion);
//   const [stores, setStores] = useState([]);
//   const [currentStore, setCurrentStore] = useState(null);
//   const [showDefaultStore, setShowDefaultStore] = useState(false);
//   // Calculate distances and sort by closest to location
//   // _findCurrentLocation populates this.state.region with the correct lat/lon
//   // Since it's initially set to a default value, we use that instead of this.state.location
//   useEffect(() => {
//     const orderStoresByDistance = async () => {
//       // console.log('IN order stores by dist HOOK');
//       // const sortedStores = [];
//       // // Display distance in the StoreList
//       // props.inputStores.forEach((store) => {
//       //   const currStore = store;
//       //   currStore.distance = findStoreDistance(props.region, store);
//       //   sortedStores.push(currStore);
//       // });
//       // // sorts in place
//       // sortedStores.sort(function compare(a, b) {
//       //   return a.distance - b.distance;
//       // });

//       // const defaultStore = props.inputStores.find((store) => {
//       //   return store.id === RecordIds.defaultStoreId;
//       // });

//       // const defaultRegion = {
//       //   latitude: defaultStore.latitude,
//       //   longitude: defaultStore.longitude,
//       //   ...deltas,
//       // };

//       // setStores(sortedStores);

//       if (locationErrorMsg || sortedStores[0].distance > 100) {
//         setCurrentStore(defaultStore);
//       } else {
//         setCurrentStore(sortedStores[0]);
//       }

//       setShowDefaultStore(
//         locationErrorMsg ? true : sortedStores[0].distance > 100
//       );
//       if (locationErrorMsg || sortedStores[0].distance > 100) {
//         setRegion(defaultRegion);
//       }
//       Analytics.setUserProperty(
//         'closest_store',
//         showDefaultStore ? 'default' : sortedStores[0].storeName
//       );
//       console.log('FINISHED ORDER STORES BY DISTANCE');
//     };
//     orderStoresByDistance();
//   }, []);

//   return { locationErrorMsg, region, stores, currentStore, showDefaultStore };
// }

function useCurrentLocation() {
  const [error, setError] = useState(null);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          Analytics.setUserProperty('location_permissions', 'denied');
          throw new Error('Permission to access location was denied');
        } else {
          const location = await Location.getCurrentPositionAsync({
            timeout: 3000,
          });
          const currentRegion = {
            latitude: location.coords.latitude - deltas.latitudeDelta / 3.5,
            longitude: location.coords.longitude,
            ...deltas,
          };
          setRegion(currentRegion);
          Analytics.setUserProperty('location_permissions', 'granted');
        }
        console.log('finished usecurrentlocation hook');
      } catch (err) {
        Analytics.setUserProperty('location_permissions', 'error');
        logErrorToSentry({
          screen: 'MapScreen',
          function: 'useCurrentLocation',
          error: err,
        });
        setError(err.message);
      }
    };
    getCurrentLocation();
  }, []);

  return { error, region };
}

export default function MapScreen(props) {
  const [locationErrorMsg, setlocationErrorMsg] = useState('');
  const [region, setRegion] = useState(initialRegion);
  const [stores, setStores] = useState([]);
  const [currentStore, setCurrentStore] = useState(null);
  // let currentStore = null;
  const [storeProducts, setStoreProducts] = useState([]);
  const [showDefaultStore, setShowDefaultStore] = useState(false);
  const bottomSheetRef = React.useRef(null);

  const mapRef = React.useRef(null);

  // Asks for permission if necessary, then gets current location
  const findCurrentLocation = async () => {
    console.log('IN FIND CURRENT LOCATION');
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    // Error message not checked anywhere
    if (status !== 'granted') {
      setlocationErrorMsg('Permission to access location was denied');
      Analytics.setUserProperty('location_permissions', 'denied');
    } else {
      try {
        const location = await Location.getCurrentPositionAsync({
          timeout: 3000,
        });
        const currentRegion = {
          latitude: location.coords.latitude - deltas.latitudeDelta / 3.5,
          longitude: location.coords.longitude,
          ...deltas,
        };
        // Don't re-animate if we're using the default store
        if (mapRef.current && !showDefaultStore) {
          mapRef.current.animateToRegion(currentRegion, 1000);
          setlocationErrorMsg(null);
        } else {
          setlocationErrorMsg(null);
          setRegion(currentRegion);
        }
        Analytics.setUserProperty('location_permissions', 'granted');
      } catch (err) {
        console.log(err);
        setlocationErrorMsg('Permission to access location was denied');
        Analytics.setUserProperty('location_permissions', 'error');
        logErrorToSentry({
          screen: 'MapScreen',
          function: '_findCurrentLocation',
          error: err,
        });
      }
    }
  };

  const isFirstRun = React.useRef(true);
  useEffect(() => {
    console.log('useEffect, isFirstRun');

    // The state is initially populated with stores by calling the Airtable API to get all store records
    // if (isFirstRun.current) {
    //   isFirstRun.current = false;
    //   return;
    // }
    const populateInitialStoresProducts = async () => {
      console.log('IN populateInitialStoresProducts useEffect');
      try {
        // Sets list of stores in state, populates initial products
        const allStores = await getStoreData();

        const sortedStores = await orderStoresByDistance(region, allStores);
        setStores(sortedStores);

        const { defaultStore, defaultRegion } = findDefaultStore(sortedStores);

        // Set current store to be focused
        if (locationErrorMsg || sortedStores[0].distance > 100) {
          defaultStore.focused = true;
          setCurrentStore(defaultStore);
        } else {
          sortedStores[0].focused = true;
          setCurrentStore(sortedStores[0]);
        }

        setShowDefaultStore(
          locationErrorMsg ? true : sortedStores[0].distance > 100
        );
        if (locationErrorMsg || sortedStores[0].distance > 100) {
          setRegion(defaultRegion);
        }

        // Once we choose the closest store, we must populate its store products
        // Better to perform API calls at top level, and then pass data as props.
        await populateStoreProducts(currentStore);
        console.log('finshed populateInitialStoresProducts');
      } catch (err) {
        // Alert.alert('Update required', 'Refresh the app to see changes', [
        //   { text: 'OK', onPress: async () => Updates.reloadAsync() },
        // ]);
        console.error(
          '[MapScreen] (_populateInitialStoresProducts) Airtable:',
          err
        );
        logErrorToSentry({
          screen: 'MapScreen',
          function: '_populateInitialStoresProducts',
          error: err,
        });
      }
    };
    populateInitialStoresProducts();
  }, [isFirstRun]);

  // The state is initially populated with stores by calling the Airtable API to get all store records
  // const populateInitialStoresProducts = async () => {
  //   console.log('IN populateInitialStoresProducts');
  //   try {
  //     const allStores = await getStoreData();
  //     console.log('all stores loaded, len', allStores.length);

  //     // Sets list of stores in state, populates initial products
  //     await orderStoresByDistance(allStores);
  //     console.log(
  //       'populate: order by dist done, curr is ',
  //       currentStore ? currentStore.storeName : 'NULL'
  //     );

  //     // Set current store to be focused
  //     currentStore.focused = true;
  //     // Once we choose the closest store, we must populate its store products
  //     // Better to perform API calls at top level, and then pass data as props.
  //     await populateStoreProducts(currentStore);
  //     console.log('finshed populateInitialStoresProducts');
  //   } catch (err) {
  //     // Alert.alert('Update required', 'Refresh the app to see changes', [
  //     //   { text: 'OK', onPress: async () => Updates.reloadAsync() },
  //     // ]);
  //     console.error(
  //       '[MapScreen] (_populateInitialStoresProducts) Airtable:',
  //       err
  //     );
  //     logErrorToSentry({
  //       screen: 'MapScreen',
  //       function: '_populateInitialStoresProducts',
  //       error: err,
  //     });
  //   }
  // };

  const populateStoreProducts = async (store) => {
    console.log('Populate store products');
    if (store) {
      try {
        const products = await getProductData(store);
        console.log('products', products);
        if (products) {
          setStoreProducts(products);
        }
      } catch (err) {
        console.error('[MapScreen] (populateStoreProducts) Airtable:', err);
        logErrorToSentry({
          screen: 'MapScreen',
          function: 'populateStoreProducts',
          error: err,
        });
      }
    }
  };

  const renderContent = () => {
    console.log('in render content');
    return (
      <View>
        <View
          style={{
            display: 'flex',
            alignItems: 'flex-end',
          }}>
          {!showDefaultStore && (
            <CenterLocation
              callBack={async () => {
                Analytics.logEvent('center_location', {
                  purpose: 'Centers map to current location',
                });
                await findCurrentLocation();
                await orderStoresByDistance(stores);
              }}
            />
          )}
        </View>
        <BottomSheetContainer>
          <BottomSheetHeaderContainer>
            <DragBar />
          </BottomSheetHeaderContainer>
          {PixelRatio.getFontScale() < 1.2 && (
            <Subtitle
              style={{ marginHorizontal: 16, marginBottom: 0 }}
              color={Colors.secondaryText}>
              Browsing healthy products at
            </Subtitle>
          )}
          {currentStore ? (
            <StoreProducts
              navigation={props.navigation}
              store={currentStore}
              products={storeProducts}
              showDefaultStore={showDefaultStore}
            />
          ) : (
            <View />
          )}
        </BottomSheetContainer>
      </View>
    );
  };

  const onRegionChangeComplete = (newRegion) => {
    console.log('on region change complete');
    setRegion(newRegion);
  };

  // Update current store and its products
  // Only called after initial store has been set
  // Only expand (reset) the bottom sheet to display products if navigated from StoreList
  const changeCurrentStore = async (store, resetSheet = false) => {
    console.log('in changeCurrentStore');
    Analytics.logEvent('view_store_products', {
      store_name: currentStore.storeName,
      products_in_stock: 'productIds' in store ? store.productIds.length : 0,
      purpose: 'View a store and products available',
    });
    // Set store focus status
    currentStore.focused = false;
    // eslint-disable-next-line no-param-reassign
    store.focused = true;

    // Animate to new store region
    const newRegion = {
      latitude: store.latitude - deltas.latitudeDelta / 3.5,
      longitude: store.longitude,
      ...deltas,
    };
    setCurrentStore(store);
    if (resetSheet) {
      bottomSheetRef.current.snapTo(1);
    }
    await populateStoreProducts(store);
    await mapRef.current.animateToRegion(newRegion, 1000);
  };

  // let result = useCurrentLocation();
  // console.log('result of usecurrloc: ', result);
  // setlocationErrorMsg(result.error);
  // setRegion(result.region);

  // useEffect(() => {
  //   // setRegion(useCurrentLocation().region);
  //   console.log('IN first use effect');
  //   const initialize = async () => {
  //     if (region != null) {
  //       console.log('finally region is not null');
  //       await populateInitialStoresProducts();
  //     }
  //     // We get current location first, since we need to use the lat/lon found in _populateIntitialStoresProducts
  //     // await findCurrentLocation();
  //   };
  //   initialize();
  // }, []);

  // const isFirstRun = useRef(false);

  // useEffect(() => {
  //   console.log('RUNNING, current is ', isFirstRun.current);
  //   if (!isFirstRun.current) {
  //     isFirstRun.current = true;
  //     return;
  //   }
  //   const store = props.route.params.currentStore;
  //   const resetSheet = true;
  //   store.distance = findStoreDistance(store);
  //   changeCurrentStore(store, resetSheet);
  //   const newRegion = {
  //     latitude: store.latitude,
  //     longitude: store.longitude,
  //     ...deltas,
  //   };
  //   setRegion(newRegion);
  // }, [props.route.params]);

  // If populateStores has not finished, return nothing
  if (!stores || !storeProducts) {
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
        <Hamburger navigation={props.navigation} />
        {/* Display search bar */}
        <SearchBar
          style={{ flex: 1 }}
          onPress={() =>
            props.navigation.navigate('StoreList', {
              stores,
              navigation: props.navigation,
              showDefaultStore,
            })
          }>
          <FontAwesome5
            name="search"
            size={16 * Math.min(PixelRatio.getFontScale(), 1.4)}
            color={Colors.primaryOrange}
          />
          <Subtitle color={Colors.secondaryText} style={{ marginLeft: 8 }}>
            Find a store
          </Subtitle>
        </SearchBar>
      </NavHeaderContainer>
      {/* Display Map */}
      <MapView
        style={{
          marginTop: -170,
          flex: 100,
          zIndex: -1,
        }}
        rotateEnabled={false}
        loadingEnabled
        showsUserLocation
        ref={mapRef}
        mapType="mutedStandard"
        region={region}
        onRegionChangeComplete={onRegionChangeComplete}>
        {/* Display store markers */}
        {stores.map((store) => (
          <Marker
            key={store.id}
            coordinate={{
              latitude: store.latitude,
              longitude: store.longitude,
            }}
            onPress={() => changeCurrentStore(store)}>
            <StoreMarker
              showName={region.longitudeDelta < 0.07}
              storeName={store.storeName}
              focused={store.focused}
            />
          </Marker>
        ))}
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
          snapPoints={snapPoints}
          renderContent={renderContent}
          // eslint-disable-next-line no-return-assign
          ref={bottomSheetRef}
        />
      </View>
      <ButtonContainer
        style={{
          position: 'absolute',
          height: 70,
          bottom: 0,
          backgroundColor: Colors.primaryGreen,
          alignSelf: 'stretch',
          width: Window.width,
          justifyContent: 'center',
          zIndex: 1000,
        }}
        onPress={() => props.navigation.navigate('RewardsOverlay')}>
        <RewardsFooter />
      </ButtonContainer>
    </View>
  );
}

MapScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  // route: PropTypes.object.isRequired,
};

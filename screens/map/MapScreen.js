import { FontAwesome5 } from '@expo/vector-icons';
import * as Analytics from 'expo-firebase-analytics';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
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

function useCurrentLocation(setRegion, setError) {
  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        console.log('in use current location ');
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
          setError('');
          setRegion(currentRegion);
          console.log('region in use current location: ', currentRegion);
          Analytics.setUserProperty('location_permissions', 'granted');
        }
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

  // return { error, region };
}

export default function MapScreen(props) {
  const [locationErrorMsg, setlocationErrorMsg] = useState(null);
  const [region, setRegion] = useState(initialRegion);
  const [stores, setStores] = useState([]);
  // const [initialLocation, setInitialLocation] = useState(null);
  const [currentStore, setCurrentStore] = useState(null);
  const [storeProducts, setStoreProducts] = useState([]);
  const [showDefaultStore, setShowDefaultStore] = useState(true);
  const bottomSheetRef = React.useRef(null);

  const mapRef = React.useRef(null);

  useCurrentLocation(setRegion, setlocationErrorMsg);

  const isFirst = useRef(true);
  const initialComplete = useRef(false);

  useEffect(() => {
    if (initialComplete.current) {
      console.log('already done, not happenin');
      return;
    }
    console.log('loc err msg is not null? : ', locationErrorMsg !== null);
    console.log('region is not initial : ', region !== initialRegion);
    console.log('initialcomplete not yet: ', !initialComplete.current);
    // if (isFirst.current) {
    if (!(locationErrorMsg != null && region !== initialRegion)) {
      console.log('XXX not ALL conds met, blocking ');
      return;
      // isFirst.current = false;
    }
    //  else {
    //   console.log('XXX not ALL conds met, blocking ');
    // }
    // console.log('first, not going, location error is  ', locationErrorMsg);
    // }
    console.log('>>> conditions met, going now with region:  ', region);

    const populateInitialStoresProducts = async () => {
      console.log('starting populate initial sotre products');
      try {
        // await findCurrentLocation();
        // Sets list of stores in state, populates initial products
        const allStores = await getStoreData();
        console.log('about to order stores with region:', region);
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
        console.log('all done, setting initial complete');

        initialComplete.current = true;
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
    // console.log('running populate using region ', region);
    populateInitialStoresProducts();
  }, [region]);

  const populateStoreProducts = async (store) => {
    if (store) {
      try {
        const products = await getProductData(store);
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
                // useCurrentLocation();
                // await findCurrentLocation();
                // await orderStoresByDistance(stores);
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
          {currentStore && (
            <StoreProducts
              navigation={props.navigation}
              store={currentStore}
              products={storeProducts}
              showDefaultStore={showDefaultStore}
            />
          )}
        </BottomSheetContainer>
      </View>
    );
  };

  const onRegionChangeComplete = (newRegion) => {
    setRegion(newRegion);
  };

  // Update current store and its products
  // Only called after initial store has been set
  // Only expand (reset) the bottom sheet to display products if navigated from StoreList
  const changeCurrentStore = async (store, resetSheet = false) => {
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

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (props.route.params) {
      const store = props.route.params.currentStore;
      changeCurrentStore(store, true);
      const newRegion = {
        latitude: store.latitude,
        longitude: store.longitude,
        ...deltas,
      };
      setRegion(newRegion);
    }
  }, [props.route.params]); // TODO: figure out how to deal with none

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
  route: PropTypes.object.isRequired,
};

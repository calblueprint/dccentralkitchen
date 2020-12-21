import { FontAwesome5 } from '@expo/vector-icons';
import * as Analytics from 'expo-firebase-analytics';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, PixelRatio, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BottomSheet from 'reanimated-bottom-sheet';
import {
  ButtonContainer,
  NavHeaderContainer,
  Subtitle,
  Title,
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
  useCurrentLocation,
  useInitialStores,
} from '../../lib/mapUtils';
import {
  BottomSheetContainer,
  BottomSheetHeaderContainer,
  DragBar,
  SearchBar,
} from '../../styled/store';

const snapPoints = [185, 325, 488];

export default function MapScreen(props) {
  const [locationErrorMsg, setLocationErrorMsg] = useState(null);
  const [region, setRegion] = useState(initialRegion);
  const [stores, setStores] = useState([]);
  const [initialLocation, setInitialLocation] = useState(null);
  const [currentStore, setCurrentStore] = useState(null);
  const [storeProducts, setStoreProducts] = useState([]);
  const [showDefaultStore, setShowDefaultStore] = useState(true);
  const bottomSheetRef = React.useRef(null);
  const mapRef = React.useRef(null);

  useCurrentLocation(setInitialLocation, setLocationErrorMsg);
  useInitialStores(initialLocation, setStores);

  const initialLoadComplete = useRef(false);
  useEffect(() => {
    if (
      initialLoadComplete.current ||
      !initialLocation ||
      stores.length === 0
    ) {
      return;
    }
    const populateInitialStoresProducts = async () => {
      try {
        const { defaultStore, defaultRegion } = findDefaultStore(stores);
        // Set current store to be focused
        if (locationErrorMsg || stores[0].distance > 100) {
          defaultStore.focused = true;
          setCurrentStore(defaultStore);
        } else {
          stores[0].focused = true;
          setCurrentStore(stores[0]);
        }
        setShowDefaultStore(locationErrorMsg ? true : stores[0].distance > 100);
        if (locationErrorMsg || stores[0].distance > 100) {
          setRegion(defaultRegion);
        } else {
          setRegion(initialLocation);
        }

        // Once we choose the closest store, we must populate its store products
        // Better to perform API calls at top level, and then pass data as props.
        await populateStoreProducts(currentStore);
        initialLoadComplete.current = true;
      } catch (err) {
        console.error(
          '[MapScreen] (populateInitialStoresProducts) Airtable:',
          err
        );
        logErrorToSentry({
          screen: 'MapScreen',
          function: 'populateInitialStoresProducts',
          error: err,
        });
      }
    };
    populateInitialStoresProducts();
  }, [initialLocation, stores, currentStore, locationErrorMsg]);

  useEffect(() => {
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
  }, [props.route.params]);

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
                setRegion(initialLocation);
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
      {/* TODO @wangannie redesign temporary map loading screen */}
      {initialLocation === null && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,.4)',
          }}>
          <Title>Locating stores</Title>
          <ActivityIndicator size="large" color={Colors.lightText} />
        </View>
      )}
    </View>
  );
}

MapScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

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
import { deltas, initialRegion } from '../../constants/Map';
import {
  findDefaultStore,
  findStoreDistance,
  sortByDistance,
  useCurrentLocation,
  useStoreProducts,
  useStores,
} from '../../lib/mapUtils';
import {
  BottomSheetContainer,
  BottomSheetHeaderContainer,
  DragBar,
  SearchBar,
} from '../../styled/store';

const snapPoints = [185, 325, 488];

export default function MapScreen(props) {
  const [region, setRegion] = useState(initialRegion);
  const [currentStore, setCurrentStore] = useState(null);

  const bottomSheetRef = useRef(null);
  const mapRef = useRef(null);
  const storeProducts = useStoreProducts(currentStore);
  const { locationPermissions, currentLocation } = useCurrentLocation();

  const stores = useStores();
  stores.sort((a, b) => sortByDistance(currentLocation, a, b));

  const showDefaultStore =
    locationPermissions !== 'granted' ||
    (stores.length > 0 && !findStoreDistance(currentLocation, stores[0]));

  // This should only happen once on first load.
  useEffect(() => {
    if (
      (!currentStore || !region) &&
      locationPermissions &&
      stores.length > 0
    ) {
      if (showDefaultStore) {
        const { defaultStore } = findDefaultStore(stores);
        changeCurrentStore(defaultStore, false, false);
      } else {
        changeCurrentStore(stores[0], false, false);
      }
    }
  }, [locationPermissions, stores]);

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

  // Update the current store and map region.
  // Only expand (reset) the bottom sheet to display products if navigated from StoreList
  const changeCurrentStore = async (
    store,
    resetSheet = false,
    animate = true
  ) => {
    Analytics.logEvent('view_store_products', {
      store_name: store.storeName,
      products_in_stock: 'productIds' in store ? store.productIds.length : 0,
      purpose: 'View a store and products available',
    });

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
    if (animate) {
      await mapRef.current.animateToRegion(newRegion, 1000);
    } else {
      setRegion(newRegion);
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
                setRegion(currentLocation);
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
              storeDistance={findStoreDistance(currentLocation, currentStore)}
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
            props.navigation.navigate('StoreList', { currentLocation })
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
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}>
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
              focused={currentStore && currentStore.id === store.id}
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
      {!locationPermissions ||
        !currentStore ||
        (stores.length === 0 && (
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
        ))}
    </View>
  );
}

MapScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

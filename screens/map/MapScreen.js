/* eslint-disable no-else-return */
import { FontAwesome5 } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import * as Analytics from 'expo-firebase-analytics';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, PixelRatio, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BottomSheet from 'reanimated-bottom-sheet';
import {
  NavHeaderContainer,
  Subtitle,
  Title,
} from '../../components/BaseComponents';
import CenterLocation from '../../components/CenterLocation';
import Hamburger from '../../components/Hamburger';
import MapFilterBlank from '../../components/map/MapFilterBlank';
import MapFilterOptions from '../../components/map/MapFilterOptions';
import StoreProducts from '../../components/product/StoreProducts';
import StoreMarker from '../../components/store/StoreMarker';
import Colors from '../../constants/Colors';
import { deltas, initialRegion } from '../../constants/Map';
import {
  findDefaultStore,
  findStoreDistance,
  getAsyncStorageMapFilters,
  setInitialAsyncStorageMapFilters,
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
  const [mapFilterObj, setMapFilterObj] = useState();
  const [filteredStores, setFilteredStores] = useState([]);

  const storeProducts = useStoreProducts(currentStore);
  const { locationPermissions, currentLocation } = useCurrentLocation();
  const stores = useStores();
  stores.forEach((store) => {
    const currStore = store;
    currStore.distance = findStoreDistance(currentLocation, store);
  });
  stores.sort((a, b) => sortByDistance(a, b));

  const bottomSheetRef = useRef(null);
  const mapRef = useRef(null);

  const showDefaultStore =
    locationPermissions !== 'granted' ||
    (stores.length > 0 && !stores[0].distance);

  useFocusEffect(
    useCallback(() => {
      getAsyncStorageMapFilters().then((initialMapFilters) => {
        if (initialMapFilters) {
          setMapFilterObj(initialMapFilters);
        } else {
          setInitialAsyncStorageMapFilters().then((mapFilters) => {
            setMapFilterObj(mapFilters);
          });
        }
      });
    }, [])
  );

  useEffect(() => {
    if (props.route.params) {
      const store = props.route.params.currentStore;
      changeCurrentStore(store, true, false);
    }
  }, [props.route.params]);

  useEffect(() => {
    if (mapFilterObj && stores.length) {
      let filteredStoresCopy;
      if (mapFilterObj.wic && !mapFilterObj.couponProgramPartner) {
        filteredStoresCopy = stores.filter((store) => store.wic);
      } else if (mapFilterObj.couponProgramPartner && !mapFilterObj.wic) {
        filteredStoresCopy = stores.filter(
          (store) => store.couponProgramPartner && !store.wic
        );
      } else if (mapFilterObj.wic && mapFilterObj.couponProgramPartner) {
        filteredStoresCopy = stores.filter(
          (store) => store.couponProgramPartner && store.wic
        );
      } else {
        filteredStoresCopy = stores;
      }
      setFilteredStores(filteredStoresCopy);

      changeCurrentStore(filteredStoresCopy[0], true, true);
    }
  }, [mapFilterObj, stores]);

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
    });

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

  // Once stores are loaded, set an initial store to focus on
  if (!currentStore && locationPermissions && stores.length > 0) {
    if (showDefaultStore) {
      const { defaultStore } = findDefaultStore(stores);
      changeCurrentStore(defaultStore, false, false);
    } else {
      changeCurrentStore(stores[0], false, false);
    }
  }

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
          {currentStore && (
            <StoreProducts
              navigation={props.navigation}
              store={currentStore}
              products={storeProducts}
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
        {/* Map Options - Hamburger Button */}
        <Hamburger navigation={props.navigation} />

        {/* Display search bar */}
        <SearchBar
          onPress={() => props.navigation.navigate('StoreList', { stores })}>
          <FontAwesome5
            name="search"
            size={16 * Math.min(PixelRatio.getFontScale(), 1.4)}
            color={Colors.primaryOrange}
            style={{ marginLeft: 12, marginRight: 12 }}
          />
          <Subtitle color={Colors.secondaryText} style={{ marginRight: 12 }}>
            Find a store
          </Subtitle>
        </SearchBar>

        {/* Map Filter */}
        <MapFilterBlank />
        {/**  <MapFilter
          toggleMapFilterOptions={() =>
            setShowMapFilterOptions(!showMapFilterOptions)
          }
        /> */}

        <MapFilterOptions setMapFilterObj={setMapFilterObj} />
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
        {filteredStores.map((store) => (
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
              wic={mapFilterObj.wic}
              couponProgramPartner={mapFilterObj.couponProgramPartner}
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
          ref={bottomSheetRef}
        />
      </View>

      {/* <RewardsFooter navigation={props.navigation} /> */}
      {(!locationPermissions || stores.length === 0) && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 200,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,.5)',
          }}>
          <Title style={{ marginBottom: 24 }}>Loading stores</Title>
          <ActivityIndicator size="large" color={Colors.bgDark} />
        </View>
      )}
    </View>
  );
}

MapScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import {
  MapFilterTouchableButtonStyling,
  MapFilterButtonTextStyling,
} from './MapFilterOptions.styled';
import {
  getAsyncStorageMapFilters,
  setAsyncStorageMapFilters,
  setInitialAsyncStorageMapFilters,
} from '../../lib/mapUtils';

export default function MapFilterOptions() {
  const SEARCH_BAR_HEIGHT = 40;
  const MAP_FILTER_OPTIONS_PADDING = 12;
  const MAP_FILTER_OPTIONS_TOP = SEARCH_BAR_HEIGHT + MAP_FILTER_OPTIONS_PADDING;

  const [mapFilterState, setMapFilterState] = useState();

  useFocusEffect(
    useCallback(() => {
      getAsyncStorageMapFilters().then((initialMapFilters) => {
        if (initialMapFilters) {
          setMapFilterState(initialMapFilters);
        } else {
          setInitialAsyncStorageMapFilters().then((mapFilters) => {
            setMapFilterState(mapFilters);
          });
        }
      });
    }, [])
  );

  const updateFilterState = (updatedMapFilter) => {
    setAsyncStorageMapFilters(updatedMapFilter).then(() => {
      setMapFilterState(updatedMapFilter);
    });
  };

  return (
    <View
      style={{
        position: 'absolute',
        top: MAP_FILTER_OPTIONS_TOP,
        right: MAP_FILTER_OPTIONS_PADDING,
      }}>
      {mapFilterState && (
        <>
          <MapFilterTouchableButtonStyling
            selected={mapFilterState.wic}
            onPress={() => {
              const newMapFilter = {
                ...mapFilterState,
                wic: !mapFilterState.wic,
              };

              updateFilterState(newMapFilter);
            }}>
            <MapFilterButtonTextStyling selected={mapFilterState.wic}>
              WIC
            </MapFilterButtonTextStyling>
          </MapFilterTouchableButtonStyling>

          <MapFilterTouchableButtonStyling
            selected={mapFilterState.couponProgramPartner}
            onPress={() => {
              const newMapFilter = {
                ...mapFilterState,
                couponProgramPartner: !mapFilterState.couponProgramPartner,
              };

              updateFilterState(newMapFilter);
            }}>
            <MapFilterButtonTextStyling
              selected={mapFilterState.couponProgramPartner}>
              SNAP Match
            </MapFilterButtonTextStyling>
          </MapFilterTouchableButtonStyling>
        </>
      )}
    </View>
  );
}

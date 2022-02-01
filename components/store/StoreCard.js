import { FontAwesome5 } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as Analytics from 'expo-firebase-analytics';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Colors from '../../constants/Colors';
import Window from '../../constants/Layout';
import { logErrorToSentry } from '../../lib/logUtils';
import {
  getMaxWidth,
  isFavorite,
  openDirections,
  toggleFavoriteStore,
  writeToClipboard,
} from '../../lib/mapUtils';
import {
  InLineContainer,
  RowContainer,
  SpaceBetweenRowContainer,
} from '../../styled/shared';
import { DividerBar, StoreCardContainer } from '../../styled/store';
import { Body, ButtonContainer, Caption, Title } from '../BaseComponents';
import ProgramTag from './ProgramTag';

/**
 * @prop
 * */

function StoreCard({ store, storeList }) {
  const {
    storeName,
    storeOpenStatus,
    address,
    distance,
    snapOrEbtAccepted,
    couponProgramPartner,
    wic,
    rewardsAccepted,
    latitude,
    longitude,
    id,
  } = store;

  const navigation = useNavigation();

  const [favorite, setFavorite] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      const fetchUser = async () => {
        try {
          const fav = await isFavorite(id);
          if (isActive) {
            setFavorite(fav);
          }
        } catch (err) {
          console.error('[StoreCard] Airtable:', err);
          logErrorToSentry({
            screen: 'StoreCard',
            action: 'useFocusEffect',
            error: err,
          });
        }
      };

      fetchUser();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const favoriteStore = async () => {
    Analytics.logEvent('toggle_favorite_store', {
      store_name: storeName,
    });
    const updateFavorite = await toggleFavoriteStore(navigation, id);
    if (updateFavorite) {
      setFavorite(!favorite);
    }
  };

  const navigateStoreDetails = () => {
    Analytics.logEvent('view_store_details', {
      store_name: storeName,
    });
    navigation.navigate('StoreDetailsScreen', {
      store,
    });
  };
  return (
    <ButtonContainer
      disabled={!storeList}
      onPress={() =>
        navigation.navigate('Stores', {
          currentStore: store,
        })
      }>
      <StoreCardContainer includeMargins>
        <SpaceBetweenRowContainer>
          <RowContainer>
            <ButtonContainer
              disabled={storeList}
              onPress={() => navigateStoreDetails()}>
              <Title
                style={{
                  maxWidth: getMaxWidth(Window.width),
                }}
                numberOfLines={1}
                ellipsizeMode="tail">
                {storeName}
              </Title>
            </ButtonContainer>
          </RowContainer>
          <ButtonContainer
            onPress={() =>
              storeList ? navigateStoreDetails() : favoriteStore()
            }
            style={{ paddingLeft: 10 }}>
            <FontAwesome5
              name={storeList ? 'info-circle' : 'heart'}
              solid={favorite}
              size={24}
              color={storeList ? Colors.primaryOrange : Colors.darkerOrange}
            />
          </ButtonContainer>
        </SpaceBetweenRowContainer>
        <ButtonContainer
          disabled={storeList}
          onPress={() => openDirections(latitude, longitude, storeName)}
          onLongPress={() => writeToClipboard(address)}>
          <Body>{address}</Body>
        </ButtonContainer>
        <RowContainer>
          {distance && (
            <Caption
              style={{ marginBottom: 4, marginTop: 4 }}
              color={Colors.secondaryText}>
              {`${distance} mi • `}
            </Caption>
          )}
          <InLineContainer style={{ alignItems: 'center' }}>
            {storeOpenStatus.includes('Open') ? (
              <Caption color={Colors.primaryGreen}>{storeOpenStatus}</Caption>
            ) : (
              <Caption color={Colors.secondaryText}>{storeOpenStatus}</Caption>
            )}
          </InLineContainer>
        </RowContainer>
        {/* Accepted Program Tags */}
        {(snapOrEbtAccepted ||
          wic ||
          couponProgramPartner ||
          rewardsAccepted) && (
          <InLineContainer
            style={{
              flexWrap: 'wrap',
              marginTop: 6,
            }}>
            {snapOrEbtAccepted && <ProgramTag program="SNAP/EBT" />}
            {wic && <ProgramTag program="WIC" />}
            {couponProgramPartner && <ProgramTag program="SNAP Match" />}
            {rewardsAccepted && <ProgramTag program="Healthy Rewards" />}
          </InLineContainer>
        )}
        <DividerBar />
      </StoreCardContainer>
    </ButtonContainer>
  );
}

StoreCard.propTypes = {
  store: PropTypes.object.isRequired,
  storeList: PropTypes.bool,
};

StoreCard.defaultProps = {
  storeList: false,
};

export default React.memo(StoreCard);

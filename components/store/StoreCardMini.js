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
  isFavoritefromCustomer,
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

function StoreCardMini({ store, storeList, seeDistance }) {
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

  const [isFavorite, setFavorite] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      const fetchUser = async () => {
        try {
          const fav = await isFavoritefromCustomer(id);
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
              onPress={() => {
                Analytics.logEvent('view_store_details', {
                  store_name: storeName,
                });
                navigation.navigate('StoreDetailsScreen', {
                  store,
                  seeDistance,
                });
              }}>
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
            onPress={async () => {
              Analytics.logEvent('toggle_favorite_store', {
                store_name: storeName,
              });
              const updateFavorite = await toggleFavoriteStore(id);
              if (updateFavorite) {
                setFavorite(!isFavorite);
              }
            }}
            style={{ paddingLeft: 10 }}>
            <FontAwesome5
              name="heart"
              solid={isFavorite}
              size={24}
              color={Colors.darkerOrange}
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
          {seeDistance && (
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

StoreCardMini.propTypes = {
  store: PropTypes.object,
  storeList: PropTypes.bool,
  seeDistance: PropTypes.bool.isRequired,
};

StoreCardMini.defaultProps = {
  store: null,
  storeList: false,
};

export default React.memo(StoreCardMini);

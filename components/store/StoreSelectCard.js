import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Analytics from 'expo-firebase-analytics';
import PropTypes from 'prop-types';
import React from 'react';
import Colors from '../../constants/Colors';
import Window from '../../constants/Layout';
import { getMaxWidth } from '../../lib/mapUtils';
import {
  ColumnContainer,
  InLineContainer,
  RowContainer,
  SpaceBetweenRowContainer,
} from '../../styled/shared';
import { DividerBar, StoreCardContainer } from '../../styled/store';
import { Body, ButtonContainer, Subtitle } from '../BaseComponents';

/**
 * @prop
 * */

function StoreSelectCard({ store, selectStore, seeDistance }) {
  const { storeName, address } = store;
  const [selected, setSelected] = React.useState(false);
  const navigation = useNavigation();

  return (
    <ButtonContainer
      onPress={() => {
        setSelected(!selected);
        selectStore();
      }}>
      <RowContainer style={{ flex: 1, width: '100%' }}>
        <Feather
          style={{ marginLeft: 16, marginTop: 8 }}
          name={selected ? 'check' : 'plus-circle'}
          size={24}
          color={selected ? Colors.primaryGreen : Colors.secondaryText}
        />
        <StoreCardContainer includeMargins style={{ flex: 1 }}>
          <SpaceBetweenRowContainer>
            <RowContainer>
              <Subtitle
                style={{
                  maxWidth: getMaxWidth(Window.width - 32),
                }}
                numberOfLines={1}
                ellipsizeMode="tail">
                {storeName}
              </Subtitle>
            </RowContainer>
            <ButtonContainer
              onPress={() => {
                Analytics.logEvent('view_store_details', {
                  store_name: storeName,
                });
                navigation.navigate('App', {
                  screen: 'Stores',
                  params: {
                    screen: 'StoreDetailsScreen',
                    params: {
                      store,
                      seeDistance,
                    },
                  },
                });
              }}
              style={{ paddingLeft: 10 }}>
              <Feather name="info" size={24} color={Colors.primaryOrange} />
            </ButtonContainer>
          </SpaceBetweenRowContainer>
          <ColumnContainer>
            <InLineContainer style={{ alignItems: 'center' }}>
              <Body>{address}</Body>
            </InLineContainer>
          </ColumnContainer>
          <DividerBar />
        </StoreCardContainer>
      </RowContainer>
    </ButtonContainer>
  );
}

StoreSelectCard.propTypes = {
  store: PropTypes.object,
  seeDistance: PropTypes.bool.isRequired,
  selectStore: PropTypes.func.isRequired,
};

StoreSelectCard.defaultProps = {
  store: null,
};

export default React.memo(StoreSelectCard);

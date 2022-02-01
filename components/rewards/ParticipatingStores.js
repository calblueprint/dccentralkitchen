import { useNavigation } from '@react-navigation/native';
import * as Analytics from 'expo-firebase-analytics';
import PropTypes from 'prop-types';
import React from 'react';
import { ColumnContainer } from '../../styled/shared';
import { ButtonContainer, Overline, Subtitle } from '../BaseComponents';

export default function ParticipatingStores({ participating, guest }) {
  const navigation = useNavigation();
  return (
    <ColumnContainer
      style={
        guest
          ? { marginLeft: 16, marginBottom: 40, marginTop: 28 }
          : { marginBottom: 40, marginTop: 28 }
      }>
      <Overline>Participating Stores</Overline>
      {participating.map((store) => {
        return (
          <ButtonContainer key={store.id}>
            <Subtitle
              style={{ marginLeft: 12 }}
              onPress={() => {
                Analytics.logEvent('participating_store_clicked', {
                  store_name: store.storeName,
                });
                navigation.navigate('Stores', {
                  currentStore: store,
                });
              }}>
              {store.storeName}
            </Subtitle>
          </ButtonContainer>
        );
      })}
      <Subtitle style={{ marginLeft: 12 }}>More stores coming soon!</Subtitle>
    </ColumnContainer>
  );
}

ParticipatingStores.propTypes = {
  participating: PropTypes.array.isRequired,
  guest: PropTypes.bool.isRequired,
};

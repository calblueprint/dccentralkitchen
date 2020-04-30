import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ColumnContainer } from '../../styled/shared';
import { Overline, Subhead } from '../BaseComponents';

export default function ParticipatingStores({ participating }) {
  const navigation = useNavigation();
  return (
    <ColumnContainer>
      <Overline style={{ marginTop: 24, marginBottom: 4 }}>
        Participating Stores
      </Overline>
      {participating.map((store) => {
        return (
          <TouchableOpacity key={store.id}>
            <Subhead
              style={{ marginLeft: 12 }}
              onPress={() =>
                navigation.navigate('Stores', {
                  currentStore: store,
                })
              }>
              {store.storeName}
            </Subhead>
          </TouchableOpacity>
        );
      })}
      <Subhead style={{ marginLeft: 12 }}>More stores coming soon!</Subhead>
    </ColumnContainer>
  );
}

ParticipatingStores.propTypes = {
  participating: PropTypes.array.isRequired,
};

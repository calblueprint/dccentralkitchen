import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { ContentContainer, ResourceItemCard } from '../../styled/resources';
import { Body, Subhead } from '../BaseComponents';

function SettingsCard({ title, description, path, navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(path)}>
      <ResourceItemCard>
        <ContentContainer>
          <Subhead>{title}</Subhead>
          <Body color={Colors.secondaryText}>{description}</Body>
        </ContentContainer>
      </ResourceItemCard>
    </TouchableOpacity>
  );
}

SettingsCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default SettingsCard;

import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Linking, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import {
  ContentContainer,
  IconContainer,
  ResourceItemCard,
} from '../../styled/resources';
import { Body, Subhead } from '../BaseComponents';

function ResourceCard({ resourceCard }) {
  return (
    <TouchableOpacity onPress={() => Linking.openURL(resourceCard.url)}>
      <ResourceItemCard>
        <ContentContainer>
          <Subhead>{resourceCard.title}</Subhead>
          <Body color={Colors.secondaryText}>{resourceCard.description}</Body>
        </ContentContainer>
        <IconContainer>
          <FontAwesome5
            name="external-link-alt"
            size={24}
            color={Colors.base}
          />
        </IconContainer>
      </ResourceItemCard>
    </TouchableOpacity>
  );
}

ResourceCard.propTypes = {
  resourceCard: PropTypes.object.isRequired,
};

export default ResourceCard;

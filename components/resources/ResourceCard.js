import { FontAwesome5 } from '@expo/vector-icons';
import * as Analytics from 'expo-firebase-analytics';
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

function cardPressed(resource) {
  Analytics.logEvent('resources_ext_link', {
    name: resource.title,
    screen: 'Resources',
    purpose: 'Opens external link',
  });
  Linking.openURL(resource.url);
}
function ResourceCard({ resourceCard }) {
  return (
    <TouchableOpacity onPress={() => cardPressed(resourceCard)}>
      <ResourceItemCard>
        <ContentContainer>
          <Subhead>{resourceCard.title}</Subhead>
          <Body color={Colors.secondaryText}>{resourceCard.description}</Body>
        </ContentContainer>
        <IconContainer>
          <FontAwesome5
            name="external-link-alt"
            size={24}
            color={Colors.primaryGray}
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

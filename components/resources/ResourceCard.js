import { FontAwesome5 } from '@expo/vector-icons';
import * as Analytics from 'expo-firebase-analytics';
import PropTypes from 'prop-types';
import React from 'react';
import { Linking } from 'react-native';
import Colors from '../../constants/Colors';
import {
  ContentContainer,
  IconContainer,
  ResourceItemCard,
} from '../../styled/resources';
import { Body, ButtonContainer, Subtitle } from '../BaseComponents';

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
    <ButtonContainer onPress={() => cardPressed(resourceCard)}>
      <ResourceItemCard>
        <ContentContainer>
          <Subtitle>{resourceCard.title}</Subtitle>
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
    </ButtonContainer>
  );
}

ResourceCard.propTypes = {
  resourceCard: PropTypes.object.isRequired,
};

export default ResourceCard;

import { FontAwesome5 } from '@expo/vector-icons';
import * as Analytics from 'expo-firebase-analytics';
import * as WebBrowser from 'expo-web-browser';
import PropTypes from 'prop-types';
import React from 'react';
import Colors from '../../constants/Colors';
import {
  ContentContainer,
  IconContainer,
  ResourceItemCard,
} from '../../styled/resources';
import { Body, ButtonContainer, Subtitle } from '../BaseComponents';

function cardPressed(resource) {
  Analytics.logEvent('open_resource_link', {
    resource_name: resource.title,
    resource_category: resource.category,
  });
  WebBrowser.openBrowserAsync(resource.url);
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

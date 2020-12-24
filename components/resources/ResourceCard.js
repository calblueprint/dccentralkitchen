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

function cardPressed(title, category, url) {
  Analytics.logEvent('open_resource_link', {
    resource_name: title,
    resource_category: category.toString(),
  });
  WebBrowser.openBrowserAsync(url);
}
function ResourceCard({ title, description, category, url }) {
  return (
    <ButtonContainer onPress={() => cardPressed(title, category, url)}>
      <ResourceItemCard>
        <ContentContainer>
          <Subtitle>{title}</Subtitle>
          <Body color={Colors.secondaryText}>{description}</Body>
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
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  category: PropTypes.array,
  url: PropTypes.string.isRequired,
};

ResourceCard.defaultProps = {
  description: '',
  category: [],
};

export default ResourceCard;

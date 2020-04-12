import { FontAwesome5 } from '@expo/vector-icons';
import * as Analytics from 'expo-firebase-analytics';
import React from 'react';
import { Linking, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import {
  ContentContainer,
  IconContainer,
  ResourceItemCard,
} from '../../styled/resources';
import { Body, Subhead } from '../BaseComponents';

class ResourceCard extends React.Component {
  cardPressed() {
    Analytics.logEvent('Resources Link Pressed', {
      name: this.props.resourceCard.title,
      screen: 'Resources',
      purpose: 'Opens external link',
    });
    Linking.openURL(this.props.resourceCard.url);
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.cardPressed()}>
        <ResourceItemCard>
          <ContentContainer>
            <Subhead>{this.props.resourceCard.title}</Subhead>
            <Body color={Colors.secondaryText}>
              {this.props.resourceCard.description}
            </Body>
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
}

export default ResourceCard;

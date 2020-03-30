import { FontAwesome5 } from '@expo/vector-icons';
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
  render() {
    return (
      <TouchableOpacity
        onPress={() => Linking.openURL(this.props.resourceCard.url)}>
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

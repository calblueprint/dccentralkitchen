import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Linking, TouchableOpacity } from 'react-native';
import { Body, Subhead } from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
import { Card, ContentContainer, IconContainer } from '../../styled/resources';

class ResourceCard extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => Linking.openURL(this.props.resourceCard.url)}>
        <Card>
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
        </Card>
      </TouchableOpacity>
    );
  }
}

export default ResourceCard;

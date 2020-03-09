import React from 'react';
import { TouchableOpacity, Linking } from 'react-native';
import {
  Card,
  ContentContainer,
  ContentText,
  LinkSubhead,
  IconContainer
} from '../../styled/resources';
import { Body, Subhead } from '../../components/BaseComponents';
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '../../assets/Colors';

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

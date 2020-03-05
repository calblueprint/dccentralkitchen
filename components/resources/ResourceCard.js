import React from 'react';
import { TouchableOpacity, Linking } from 'react-native';
import {
  Card,
  ContentContainer,
  ContentText,
  LinkSubhead,
  IconContainer
} from '../../styled/resources';
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '../../assets/Colors';

class ResourceCard extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => Linking.openURL(this.props.resourceCard.url)}>
        <Card>
          <ContentContainer>
            <LinkSubhead>{this.props.resourceCard.title}</LinkSubhead>
            <ContentText>{this.props.resourceCard.description}</ContentText>
            <IconContainer>
              <FontAwesome5 name="check" size={10} color={Colors.darkerGreen} />
            </IconContainer>
          </ContentContainer>
        </Card>
      </TouchableOpacity>
    );
  }
}

export default ResourceCard;

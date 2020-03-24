import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import Colors from '../assets/Colors';
import { BackButton, HeaderContainer } from '../styled/navheading';
import { RowContainer } from '../styled/shared';
import { Title } from './BaseComponents';

export default class NavHeading extends React.Component {
  constructor(props) {
    super(props);
  }
  navigateBack() {
    this.props.navigation.goBack();
  }
  render() {
    console.log(this.props.navigation);
    return (
      <HeaderContainer
        height={this.props.extraHigh && '300px'}
        backgroundColor={this.props.backgroundColor}>
        <RowContainer
          style={{ width: '100%' }}
          alignItems="center"
          justifyContent="center">
          <BackButton onPress={() => this.props.navigation.goBack()}>
            <FontAwesome5
              name={this.props.icon}
              solid
              size={24}
              color={this.props.lightText ? Colors.lightest : Colors.activeText}
            />
          </BackButton>
          <Title
            color={this.props.lightText ? Colors.lightest : Colors.activeText}
            style={{ textAlign: 'center' }}>
            {this.props.title}
          </Title>
        </RowContainer>
      </HeaderContainer>
    );
  }
}

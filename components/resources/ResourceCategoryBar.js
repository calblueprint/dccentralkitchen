import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import {
  CategoryCard,
  CategoryHeadingContainer,
  CategoryIcon
} from '../../styled/resources';
import { Title } from '../BaseComponents';

class ResourceCategoryBar extends React.Component {
  render() {
    return (
      <CategoryCard>
        <CategoryIcon>
          <FontAwesome5 name={this.props.icon} size={20} solid color={'#fff'} />
        </CategoryIcon>

        <CategoryHeadingContainer>
          <Title>{this.props.title}</Title>
        </CategoryHeadingContainer>
      </CategoryCard>
    );
  }
}

export default ResourceCategoryBar;

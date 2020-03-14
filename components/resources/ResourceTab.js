import React from 'react';

import {
  CategoryCard,
  CategoryIcon,
  HeadingContainer
} from '../../styled/resources';
import { Title } from '../../components/BaseComponents';
import { FontAwesome5 } from '@expo/vector-icons';

class ResourceTab extends React.Component {
  render() {
    return (
      <CategoryCard>
        <CategoryIcon>
          <FontAwesome5 name={this.props.icon} size={20} solid color={'#fff'} />
        </CategoryIcon>

        <HeadingContainer>
          <Title>{this.props.title}</Title>
        </HeadingContainer>
      </CategoryCard>
    );
  }
}

export default ResourceTab;

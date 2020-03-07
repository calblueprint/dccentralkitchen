import React from 'react';

import {
  CategoryCard,
  CategoryContainer,
  CategoryIcon,
  HeadingContainer,
  HeadingText
} from '../../styled/resources';
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '../../assets/Colors';

class ResourceTab extends React.Component {
  render() {
    return (
      <CategoryCard>
        <CategoryContainer>
          <CategoryIcon>
            <FontAwesome5
              name={this.props.icon}
              size={24}
              color={Colors.darkerGreen}
            />
          </CategoryIcon>
        </CategoryContainer>
        <HeadingContainer>
          <HeadingText>{this.props.title}</HeadingText>
        </HeadingContainer>
      </CategoryCard>
    );
  }
}

export default ResourceTab;

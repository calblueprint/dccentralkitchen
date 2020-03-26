import React from 'react';
import Colors from '../../assets/Colors';
import { CategoryCard, CategoryHeadingContainer } from '../../styled/resources';
import { Title } from '../BaseComponents';
import CircleIcon from '../CircleIcon';

class ResourceCategoryBar extends React.Component {
  render() {
    return (
      <CategoryCard>
        <CategoryHeadingContainer>
          <CircleIcon
            icon={this.props.icon}
            iconColor={Colors.lightest}
            circleColor={Colors.lighterGreen}
          />
          <Title>{this.props.title}</Title>
        </CategoryHeadingContainer>
      </CategoryCard>
    );
  }
}

export default ResourceCategoryBar;

import React from 'react';
import Colors from '../../assets/Colors';
import { CategoryCard, HeadingContainer } from '../../styled/resources';
import { Title } from '../BaseComponents';
import CircleIcon from '../CircleIcon';

class ResourceCategoryBar extends React.Component {
  render() {
    return (
      <CategoryCard>
        <CircleIcon
          icon={this.props.icon}
          iconColor={Colors.lightest}
          circleColor={Colors.lighterGreen}
        />
        <HeadingContainer>
          <Title>{this.props.title}</Title>
        </HeadingContainer>
      </CategoryCard>
    );
  }
}

export default ResourceCategoryBar;

import PropTypes from 'prop-types';
import React from 'react';
import Colors from '../../constants/Colors';
import { CategoryCard, CategoryHeadingContainer } from '../../styled/resources';
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
        <CategoryHeadingContainer>
          <Title>{this.props.title}</Title>
        </CategoryHeadingContainer>
      </CategoryCard>
    );
  }
}

ResourceCategoryBar.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ResourceCategoryBar;

import PropTypes from 'prop-types';
import React from 'react';
import Colors from '../../constants/Colors';
import { CategoryCard, CategoryHeadingContainer } from '../../styled/resources';
import { Title } from '../BaseComponents';
import CircleIcon from '../CircleIcon';

function CategoryBar({ icon, title }) {
  return (
    <CategoryCard>
      <CircleIcon
        icon={icon}
        iconColor={Colors.lightest}
        circleColor={Colors.lighterGreen}
      />
      <CategoryHeadingContainer>
        <Title>{title}</Title>
      </CategoryHeadingContainer>
    </CategoryCard>
  );
}

CategoryBar.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default CategoryBar;

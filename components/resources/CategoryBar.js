import PropTypes from 'prop-types';
import React from 'react';
import Colors from '../../constants/Colors';
import { CategoryCard, CategoryHeadingContainer } from '../../styled/resources';
import { Title } from '../BaseComponents';
import CircleIcon from '../CircleIcon';

function CategoryBar({ icon, title }) {
  return (
    <CategoryCard>
      {icon !== '' && (
        <CircleIcon
          icon={icon}
          iconColor={Colors.lightText}
          circleColor={Colors.lighterGreen}
        />
      )}
      <CategoryHeadingContainer style={icon !== '' && { marginLeft: 12 }}>
        <Title>{title}</Title>
      </CategoryHeadingContainer>
    </CategoryCard>
  );
}

CategoryBar.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
};

CategoryBar.defaultProps = {
  icon: '',
};

export default CategoryBar;

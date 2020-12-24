import PropTypes from 'prop-types';
import React from 'react';
import Colors from '../../constants/Colors';
import { CategoryCard, CategoryHeadingContainer } from '../../styled/resources';
import { Subtitle, Title } from '../BaseComponents';
import CircleIcon from '../CircleIcon';

function CategoryBar({ icon, title, mini }) {
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
        {mini ? <Subtitle>{title}</Subtitle> : <Title>{title}</Title>}
      </CategoryHeadingContainer>
    </CategoryCard>
  );
}

CategoryBar.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  mini: PropTypes.bool,
};

CategoryBar.defaultProps = {
  icon: '',
  mini: false,
};

export default CategoryBar;

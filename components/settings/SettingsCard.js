import PropTypes from 'prop-types';
import React from 'react';
import Colors from '../../constants/Colors';
import { ContentContainer, ResourceItemCard } from '../../styled/resources';
import { Body, ButtonContainer, Subtitle } from '../BaseComponents';

function SettingsCard({ title, description, navigation, titleColor }) {
  return (
    <ButtonContainer onPress={() => navigation()}>
      <ResourceItemCard>
        <ContentContainer>
          <Subtitle color={titleColor}>{title}</Subtitle>
          {description === '' || (
            <Body color={Colors.secondaryText}>{description}</Body>
          )}
        </ContentContainer>
      </ResourceItemCard>
    </ButtonContainer>
  );
}

SettingsCard.propTypes = {
  title: PropTypes.string.isRequired,
  titleColor: PropTypes.string,
  description: PropTypes.string,
  navigation: PropTypes.func.isRequired,
};

SettingsCard.defaultProps = {
  titleColor: Colors.activeText,
  description: '',
};

export default SettingsCard;

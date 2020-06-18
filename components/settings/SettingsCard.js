import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import Colors from '../../constants/Colors';
import {
  ContentContainer,
  IconContainer,
  ResourceItemCard,
} from '../../styled/resources';
import { Body, ButtonContainer, Subtitle } from '../BaseComponents';

function SettingsCard({
  title,
  description,
  navigation,
  titleColor,
  rightIcon,
}) {
  return (
    <ButtonContainer onPress={() => navigation()}>
      <ResourceItemCard>
        <ContentContainer>
          <Subtitle color={titleColor}>{title}</Subtitle>
          {description === '' || (
            <Body color={Colors.secondaryText}>{description}</Body>
          )}
        </ContentContainer>
        {rightIcon !== '' && (
          <IconContainer>
            <FontAwesome5
              name={rightIcon}
              size={24}
              color={Colors.primaryGray}
            />
          </IconContainer>
        )}
      </ResourceItemCard>
    </ButtonContainer>
  );
}

SettingsCard.propTypes = {
  title: PropTypes.string.isRequired,
  titleColor: PropTypes.string,
  description: PropTypes.string,
  navigation: PropTypes.func.isRequired,
  rightIcon: PropTypes.string,
};

SettingsCard.defaultProps = {
  titleColor: Colors.activeText,
  description: '',
  rightIcon: '',
};

export default SettingsCard;

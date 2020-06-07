import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { ContentContainer, ResourceItemCard } from '../../styled/resources';
import { Body, Subhead } from '../BaseComponents';

function SettingsCard({ title, description, navigation, titleColor }) {
  return (
    <TouchableOpacity onPress={() => navigation()}>
      <ResourceItemCard>
        <ContentContainer>
          <Subhead color={titleColor}>{title}</Subhead>
          {description === '' || (
            <Body color={Colors.secondaryText}>{description}</Body>
          )}
        </ContentContainer>
      </ResourceItemCard>
    </TouchableOpacity>
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

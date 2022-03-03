import * as Analytics from 'expo-firebase-analytics';
import * as WebBrowser from 'expo-web-browser';
import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Colors from '../../constants/Colors';
import { ContentContainer, RecipeItemCard } from '../../styled/recipes';
import { IconContainer } from '../../styled/resources';
import { Body, ButtonContainer, Subtitle } from '../BaseComponents';

function cardPressed(title, url) {
  Analytics.logEvent('open_receipe_link', {
    receipe_name: title,
  });
  WebBrowser.openBrowserAsync(url);
}
function RecipeCard({ title, description, thumbnail, picture }) {
  return (
    <ButtonContainer onPress={() => cardPressed(title)}>
      <RecipeItemCard>
        <ContentContainer>
          <Subtitle>{title}</Subtitle>
          <Body color={Colors.secondaryText}>{description}</Body>
        </ContentContainer>
        <IconContainer>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: thumbnail,
            }}
            alt="test"
          />
        </IconContainer>
      </RecipeItemCard>
    </ButtonContainer>
  );
}

RecipeCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  thumbnail: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
};

RecipeCard.defaultProps = {
  description: '',
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

export default RecipeCard;

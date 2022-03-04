import PropTypes from 'prop-types';
import React from 'react';
import { Image, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { ContentContainer, RecipeItemCard } from '../../styled/recipes';
import { IconContainer } from '../../styled/resources';
import { Body, Subtitle } from '../BaseComponents';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {
    headerMode: 'none',
  },
});
function RecipeCard({ navigation, item }) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Recipe', { item });
      }}
      screenOptions={{
        drawerLabel: `${item.title}`,
        headerShown: false,
        cardStyle: { backgroundColor: Colors.bgLight },
        config,
      }}>
      <RecipeItemCard>
        <ContentContainer>
          <Subtitle>{item.title}</Subtitle>
          <Body color={Colors.secondaryText}>{item.description}</Body>
        </ContentContainer>
        <IconContainer>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: item.image[0].thumbnails.small.url,
            }}
            alt={`${item.description}`}
          />
        </IconContainer>
      </RecipeItemCard>
    </TouchableOpacity>
  );
}

RecipeCard.propTypes = {
  item: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
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

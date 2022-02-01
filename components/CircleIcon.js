import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';

function CircleIcon({ circleColor, icon, iconColor }) {
  return (
    <View style={styles.container} backgroundColor={circleColor}>
      <FontAwesome5
        name={icon}
        size={22}
        solid
        color={iconColor}
        style={{ paddingTop: 1 }}
      />
    </View>
  );
}

CircleIcon.propTypes = {
  circleColor: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  iconColor: PropTypes.string.isRequired,
};

export default CircleIcon;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    padding: 8,
    borderRadius: 20,
  },
});

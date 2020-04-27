import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Chip } from 'react-native-paper';
import Colors from '../../constants/Colors';
import { styles } from '../../styled/store';
import { Caption } from '../BaseComponents';

/**
 * @prop
 * */

// Capitalizes the first letter of every word in a phrase.
// Note: catch special cases like certain words that are all uppercase.
function capitalizeFirstLetters(word) {
  // Separate each individual word in phrase.

  // Special case since SNAP is all uppercase
  if (word.toLowerCase() === 'snap match') {
    return 'SNAP Match';
  }

  const splitWord = word.toLowerCase().split(' ');

  for (var i = 0; i < splitWord.length; i++) {
    splitWord[i] =
      splitWord[i].charAt(0).toUpperCase() + splitWord[i].substring(1);
  }

  return splitWord.join(' ');
}

// program: a string representing the program name (valid programs are keys in programToIcon)
function ProgramTag({ program }) {
  let programLabel = program;

  // Error checking: We'll fix the program label if it was somehow entered incorrectly
  // i.e. "WIC" was entered as "WIc" or "SNAP Match" was entered as "snap Match"
  // Hopefully ensures that chips will work most of the time, only not displaying if
  // they enter the wrong string of words
  if (
    (program.toLowerCase() === 'wic' && program !== 'WIC') ||
    (program.toLowerCase() === 'ebt' && program !== 'EBT')
  ) {
    programLabel = program.toUpperCase();
  }

  if (
    (program.toLowerCase() === 'snap match' && program !== 'SNAP Match') ||
    (program.toLowerCase() === 'healthy rewards' &&
      program !== 'Healthy Rewards')
  ) {
    programLabel = capitalizeFirstLetters(program);
  }

  const programToIcon = {
    EBT: 'credit-card',
    WIC: 'heart',
    'SNAP Match': 'carrot',
    'Healthy Rewards': 'star',
  };

  if (!Object.keys(programToIcon).includes(program)) {
    return null;
  }

  return (
    <Chip
      icon={() => (
        <FontAwesome5
          name={programToIcon[program]}
          solid
          size={10}
          color={Colors.darkerGreen}
          style={{ marginTop: -1 }}
        />
      )}
      textStyle={styles.tagChipText}
      style={styles.tagChip}>
      <Caption color={Colors.darkerGreen}>{programLabel}</Caption>
    </Chip>
  );
}

ProgramTag.propTypes = {
  program: PropTypes.string.isRequired,
};

export default ProgramTag;

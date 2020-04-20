import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Chip } from 'react-native-paper';
import Colors from '../../constants/Colors';

/**
 * @prop
 * */

function ProgramTag({program}) {
  const programToIcon = {
    snapOrEbtAccepted: 'credit-card',
    wic: 'heart',
    couponProgramPartner: 'carrot',
    rewardsAccepted: 'star',
  };

  const programToLabel = {
    snapOrEbtAccepted: 'EBT',
    wic: 'WIC',
    couponProgramPartner: 'SNAP Match',
    rewardsAccepted: 'Healthy Rewards',
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
      textStyle={styles.chipText}
      style={styles.chip}>
      <Caption color={Colors.darkerGreen}>{programToLabel[]}</Caption>
    </Chip>
  );
}

ProgramTag.propTypes = {
  callBack: PropTypes.func.isRequired,
};

export default ProgramTag;

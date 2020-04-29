import { FontAwesome5 } from '@expo/vector-icons';
import { Linking } from 'expo';
import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
import { ColumnContainer, SpaceBetweenRowContainer } from '../../styled/shared';
import { styles } from '../../styled/store';
import { Body, TabSelected } from '../BaseComponents';
import ProgramTag from './ProgramTag';

/**
 * @prop
 * */

const programToDesc = {
  EBT: 'Accepts SNAP/EBT',
  WIC: 'WIC approved',
  'SNAP Match':
    'Spend $5 with SNAP and include fresh produce in purchase to get $5 free on fresh produce',
  'Healthy Rewards': 'Accepts Healthy Rewards',
};

const snapURL = 'https://dccentralkitchen.org/5for5/';

function Program({ programName }) {
  return (
    <SpaceBetweenRowContainer>
      <ProgramTag program={programName} />
      <View style={styles.tagChipDesc}>
        <Body>{programToDesc[programName]}</Body>
        {programName === 'SNAP Match' && (
          <TouchableOpacity
            style={{ flexDirection: 'row' }}
            onPress={() => Linking.openURL(snapURL)}>
            <TabSelected
              color={Colors.primaryOrange}
              style={{ marginRight: 4 }}>
              Learn More
            </TabSelected>
            <FontAwesome5
              name="external-link-alt"
              size={14}
              color={Colors.primaryOrange}
            />
          </TouchableOpacity>
        )}
      </View>
    </SpaceBetweenRowContainer>
  );
}

export default function AcceptedPrograms({
  snapOrEbtAccepted,
  wic,
  couponProgramPartner,
  rewardsAccepted,
}) {
  return (
    <ColumnContainer
      style={{ justifyContent: 'space-between', paddingRight: '20%' }}>
      {snapOrEbtAccepted && <Program programName="EBT" />}
      {wic && <Program programName="WIC" />}
      {couponProgramPartner && <Program programName="SNAP Match" />}
      {rewardsAccepted && <Program programName="Healthy Rewards" />}
    </ColumnContainer>
  );
}

AcceptedPrograms.propTypes = {
  snapOrEbtAccepted: PropTypes.bool,
  wic: PropTypes.bool,
  couponProgramPartner: PropTypes.bool,
  rewardsAccepted: PropTypes.bool,
};

AcceptedPrograms.defaultProps = {
  snapOrEbtAccepted: false,
  wic: false,
  couponProgramPartner: false,
  rewardsAccepted: false,
};

Program.propTypes = {
  programName: PropTypes.string.isRequired,
};

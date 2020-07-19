import { FontAwesome5 } from '@expo/vector-icons';
import * as Analytics from 'expo-firebase-analytics';
import * as WebBrowser from 'expo-web-browser';
import PropTypes from 'prop-types';
import React from 'react';
import Colors from '../../constants/Colors';
import { ColumnContainer, SpaceBetweenRowContainer } from '../../styled/shared';
import { styles } from '../../styled/store';
import { Body, ButtonContainer, ButtonLabel } from '../BaseComponents';
import ProgramTag from './ProgramTag';
/** i
 * @prop
 * */

const programToDesc = {
  'SNAP/EBT': 'Accepts SNAP/EBT',
  WIC: 'WIC approved',
  'SNAP Match':
    'Spend $5 with SNAP and include fresh produce in purchase to get $5 free on fresh produce',
  'Healthy Rewards': 'Participates in Healthy Rewards',
};

const snapMatchURL =
  'https://healthycorners.calblueprint.org/faq.html#snap-matching-and-coupons';

function Program({ programName }) {
  return (
    <SpaceBetweenRowContainer>
      <ProgramTag program={programName} />
      <ColumnContainer style={styles.tagChipDesc}>
        <Body>{programToDesc[programName]}</Body>
        {programName === 'SNAP Match' && (
          <ButtonContainer
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => {
              Analytics.logEvent('snap_match_learn_more', {
                purpose: 'Clicked Learn More link about SNAP matching',
              });
              WebBrowser.openBrowserAsync(snapMatchURL);
            }}>
            <ButtonLabel
              noCaps
              color={Colors.primaryOrange}
              style={{ marginRight: 4 }}>
              Learn More
            </ButtonLabel>
            <FontAwesome5
              name="external-link-alt"
              size={14}
              color={Colors.primaryOrange}
            />
          </ButtonContainer>
        )}
      </ColumnContainer>
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
      {snapOrEbtAccepted && <Program programName="SNAP/EBT" />}
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

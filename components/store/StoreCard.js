import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import Colors from '../../assets/Colors';
import {
  InLineContainer,
  SpaceAroundRowContainer,
  SpaceBetweenRowContainer
} from '../../styled/shared';
import {
  DividerBar,
  EBTStatusBar,
  StoreCardContainer,
  StoreDetailText
} from '../../styled/store';
import { Caption, Title } from '../BaseComponents';
import StoreProductButton from './StoreProductButton';

/**
 * @prop
 * */

function StoreCard({ store, callBack, seeProduct }) {
  const { name, hours, address, distance, ebt, rewards } = store;
  return (
    <StoreCardContainer includeMargins>
      <SpaceBetweenRowContainer>
        <SpaceAroundRowContainer>
          <Title color={Colors.activeText}>{name}</Title>
          {ebt && (
            <EBTStatusBar>
              <FontAwesome5 name="check" size={10} color={Colors.darkerGreen} />
              <Caption color={Colors.darkerGreen}> EBT</Caption>
            </EBTStatusBar>
          )}
        </SpaceAroundRowContainer>
        {seeProduct && <StoreProductButton callBack={callBack} />}
      </SpaceBetweenRowContainer>
      <Caption style={{ marginBottom: 4 }} color={Colors.secondaryText}>
        {distance} miles away
      </Caption>
      <InLineContainer style={{ alignItems: 'center' }}>
        <FontAwesome5
          name="star"
          solid
          size={16}
          color={rewards ? Colors.primaryGreen : Colors.secondaryText}
        />
        <StoreDetailText greenText={rewards}>
          {rewards
            ? 'Earn and redeem Healthy Rewards here'
            : 'Healthy Rewards not accepted'}
        </StoreDetailText>
      </InLineContainer>
      <InLineContainer style={{ alignItems: 'center' }}>
        <FontAwesome5
          name="directions"
          size={16}
          color={Colors.secondaryText}
        />
        <StoreDetailText>{address}</StoreDetailText>
      </InLineContainer>
      <InLineContainer style={{ alignItems: 'center' }}>
        <FontAwesome5
          name="clock"
          solid
          size={16}
          color={Colors.secondaryText}
        />
        <StoreDetailText>{hours}</StoreDetailText>
      </InLineContainer>
      <DividerBar />
    </StoreCardContainer>
  );
}

export default StoreCard;

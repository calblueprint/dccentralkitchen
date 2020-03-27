import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import Colors from '../../constants/Colors';
import {
  InLineContainer,
  SpaceAroundRowContainer,
  SpaceBetweenRowContainer,
} from '../../styled/shared';
import {
  DividerBar,
  EBTStatusBar,
  StoreCardContainer,
} from '../../styled/store';
import { Body, Caption, Title } from '../BaseComponents';
import StoreProductButton from './StoreProductButton';

/**
 * @prop
 * */

function StoreCard({ store, callBack, seeProduct }) {
  const { name, hours, address, distance, ebt, rewards } = store;
  return (
    <StoreCardContainer>
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
      {rewards && (
        <InLineContainer style={{ alignItems: 'center' }}>
          <FontAwesome5
            name="star"
            solid
            size={16}
            color={Colors.primaryGreen}
          />
          <Body color={Colors.primaryGreen}>
            Earn and redeem Healthy Rewards here
          </Body>
        </InLineContainer>
      )}
      <InLineContainer style={{ alignItems: 'center' }}>
        <FontAwesome5
          name="directions"
          size={16}
          color={Colors.secondaryText}
        />
        <Body color={Colors.secondaryText}> {address}</Body>
      </InLineContainer>
      <InLineContainer style={{ alignItems: 'center' }}>
        <FontAwesome5
          name="clock"
          solid
          size={16}
          color={Colors.secondaryText}
        />
        <Body color={Colors.secondaryText}> {hours}</Body>
      </InLineContainer>
      <DividerBar />
    </StoreCardContainer>
  );
}

export default StoreCard;

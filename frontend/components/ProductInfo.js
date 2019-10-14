import React from 'react';
import { Title, Subtitle } from '../styles.js';
import SpecialNotice from './SpecialNotice';
import {
    Text,
    View,
  } from 'react-native';

/**
 * @prop 
**/

function ProductInfo({ product }) {
    const { name, id, category, points, customerCost } = product;
    return (
        <View style={{width: 300}}>
            <Title>{name}</Title>
            <Subtitle>Category: {category}</Subtitle>
            <View style={{flexDirection: 'row'}}>
                <Subtitle>${customerCost} each</Subtitle>
                <Subtitle>Points Earned: {points}</Subtitle>
            </View>
            <SpecialNotice/>
      </View>
    );
  }

export default ProductInfo;

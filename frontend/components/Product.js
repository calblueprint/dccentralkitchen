import React from 'react';
import { CardContainer, CardBody } from '../styles.js';
import {
    Text,
    View,
  } from 'react-native';

/**
 * @prop 
**/

function Product({ product, props }) {
    return (
            <CardContainer>
                <CardBody>
                    {product.name}
                </CardBody>
            </CardContainer>
    );
  }

export default Product;



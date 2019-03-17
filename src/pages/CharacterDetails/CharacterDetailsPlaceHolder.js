/**
 *  PlaceHolder for the character details page
 */

import React from 'react';
import styled from 'styled-components';
import { InformationContainer, Left, Right } from './index';
import PlaceHolder from '@components/PlaceHolder';

export default () => (
  <InformationContainer>
    <Left>
      <AvatarPlaceHolder />
    </Left>
    <Right>
      {new Array(5).fill(1).map((_, index) => <ComicPlaceHolder key={index} />)}
    </Right>
  </InformationContainer>
);

/* STYLES */
const AvatarPlaceHolder = styled(PlaceHolder)`
  border-radius: 100%;
  width: 150px;
  height: 150px;
`;

const ComicPlaceHolder = styled(PlaceHolder)`
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;
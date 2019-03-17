/**
 *  Default layout wrapping the whole app
 */

import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 768px;
  margin: 20px auto;
`;

export default ({ children }) => (
  <Container>
    {children}
  </Container>
);
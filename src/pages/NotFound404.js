/**
 *  Custom client-side 404
 */

import React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Routes from '@routes';

export default () => (
  <Container>
    <Modal404>
      <Typography
        align='center'
        component='h1'
        variant='h3'
        gutterBottom
      >
        Page not found.
      </Typography>
      <Typography
        align='center'
        component='p'
        variant='headline'
      >
        Lost in the multiverse ? Let us give you a lift back
        <HomeLink>home</HomeLink>.
      </Typography>
    </Modal404>
  </Container>
);

/* STYLES */
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal404 = styled(Paper)`
  width: 500px;
  min-height: 200px;
  padding: 20px;
`;

const HomeLink = styled(Link).attrs({
  to: Routes.HOME
})`
  text-decoration: none;
  color: #0074D9;
  opacity: 0.7;
  
  &:hover {
    opacity: 1;
    text-decoration: underline;
  }
`;
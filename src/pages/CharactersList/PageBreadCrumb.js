/**
 *  Page bread crumb: Allows the user to change the current page
 *  of the characters list page
 */

import React, { memo } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import LeftArrowIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightArrowIcon from '@material-ui/icons/KeyboardArrowRight';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import Routes, { addParamsToUrl } from '@routes';

const PageBreadCrumb = ({
  currentPage,
  history,
  isFetchingCharactersList
}) => {
  // User should not be able to go to page 0
  const isPreviousDisabled = currentPage === 1;

  return (
    <Container>
      {/* PREVIOUS PAGE */}
      <IconButton
        onClick={() => history.push(addParamsToUrl(Routes.CHARACTERS_LIST, { page: currentPage - 1 }))}
        disabled={isPreviousDisabled || isFetchingCharactersList}
      >
        <LeftArrowIcon />
      </IconButton>

      {/* CURRENT PAGE */}
      <Typography variant='button'>
        {currentPage}
      </Typography>

      {/* NEXT PAGE */}
      <IconButton
        onClick={() => history.push(addParamsToUrl(Routes.CHARACTERS_LIST, { page: currentPage + 1 }))}
        disabled={isFetchingCharactersList}
      >
        <RightArrowIcon />
      </IconButton>
    </Container>
  );
};

/* STYLES */
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
`;

/* PROP-TYPES */
PageBreadCrumb.propTypes = {
  currentPage: PropTypes.number,
  disabled: PropTypes.bool
};

PageBreadCrumb.defaultProps = {
  currentPage: 1,
  disabled: false
};

export default compose(
  memo,
  withRouter,
  connect(
    (state) => ({
      isFetchingCharactersList: state.characters.isFetchingCharactersList
    })
  )
)(PageBreadCrumb);
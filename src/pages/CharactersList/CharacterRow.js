/**
 *  Single row displaying information about a character
 *  on the character listing page
 */

import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Tooltip, Typography } from '@material-ui/core';
import moment from 'moment';
import * as PropTypes from 'prop-types';
import Routes, { addParamsToUrl } from '@routes';

class CharacterRow extends React.Component {
  // Only reason for update is the character to display has changed
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.id !== this.props.id
  }

  // Access the detail page of the character
  seeDetails = () => {
    const {
      history,
      id,
      fromPage
    } = this.props;

    history.push(addParamsToUrl(
      Routes.CHARACTER_DETAILS,
      { characterId: id },
      { from_page: fromPage }
    ));
  };

  render () {
    const {
      thumbnail,
      name,
      modified,
      comics
    } = this.props;
    const formattedDate = moment.utc(modified).format('DD/MM/YY');

    return (
      <StyledTableRow onClick={this.seeDetails}>
        {/* Thumbnail */}
        <CharacterThumbnailCell url={`${thumbnail.path}.${thumbnail.extension}`} />

        {/* Name */}
        <TableCell align='left'>
          <Typography variant='title'>{name}</Typography>
        </TableCell>

        {/* Date */}
        <TableCell align='left'>{formattedDate}</TableCell>

        {/* Comics available */}
        <TableCell align='center'>
          <Tooltip title={`This character appears in ${comics.available} comics`}>
            <Typography>{comics.available}</Typography>
          </Tooltip>
        </TableCell>
      </StyledTableRow>
    )
  }
};

/* STYLES */
const CharacterThumbnailCell = styled(TableCell)`
  background-image: url(${p => p.url});
  background-size: cover;
  background-position: center;
`;

const StyledTableRow = styled(TableRow)`
  cursor: pointer;
`;

/* PROP-TYPES */
export const CharacterShape = PropTypes.shape({
  id: PropTypes.oneOf([
    PropTypes.number,
    PropTypes.string
  ]),
  thumbnail: PropTypes.shape({
    path: PropTypes.string,
    extension: PropTypes.string
  }),
  name: PropTypes.string,
  modified: PropTypes.string,
  comics: PropTypes.array
});

export default withRouter(CharacterRow);
/**
 *  Character listing page: Shows a paginated list of characters
 */

import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import TableHead from '@material-ui/core/TableHead';
import { TableCell, TableRow } from '@material-ui/core';
import styled from 'styled-components';
import { fetchCharactersList } from '@store/characters';
import CharacterRow, {CharacterShape} from './CharacterRow';
import PageBreadCrumb from './PageBreadCrumb';
import CharactersListPlaceHolder from './CharactersListPlaceHolder';

class CharactersList extends React.Component {
  currentPage = () => {
    return +this.props.match.params.page || 1;
  };

  // Fetch the characters on mount
  componentDidMount () {
    this.props.fetchCharactersList(this.currentPage());
  }

  /*  Characters list page should only update when a page change occurs
   *  or the list loading state changes (Finished fetching, started fetching)
   */
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const nextPage = +nextProps.match.params.page || 1;
    return nextPage !== this.currentPage() ||
      nextProps.isFetchingCharactersList !== this.props.isFetchingCharactersList;
  }

  /*  If the page has changed, we need to fetch the characters
   *  list for the current page
   */
  componentDidUpdate (prevProps, prevState, snapshot) {
    const prevPage = +prevProps.match.params.page || 1;
    if (prevPage !== this.currentPage()) {
      this.props.fetchCharactersList(this.currentPage());
    }
  }

  render () {
    const {
      charactersList,
      isFetchingCharactersList
    } = this.props;
    const page = this.currentPage();

    return (
      <div>
        {/* TITLES */}
        <Typography
          component='h2'
          variant='h3'
        >
          Marvel characters list
        </Typography>
        <Typography
          component='h4'
          variant='h6'
          gutterBottom
        >
          Powered by Marvel's marvelous API
        </Typography>
        <PageInformation>
          You can browse and find information on Marvel characters here. Click on a character to access their details page which will provide
          you an overlook of the comics in which the character appeared.
        </PageInformation>

        {/* PAGINATION */}
        <PageBreadCrumb currentPage={page} />

        {/* CHARACTERS LIST */}
        <Paper>
          {isFetchingCharactersList ? (
            <CharactersListPlaceHolder />
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>Character</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell align='center'>Comics</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {charactersList.map((character) => (
                  <CharacterRow
                    key={character.id}
                    fromPage={page}
                    {...character}
                  />
                ))}
              </TableBody>
            </Table>
          )}
        </Paper>

        {/* BOTTOM PAGINATION */}
        <PageBreadCrumb currentPage={page} />
      </div>
    );
  }
}

/* STYLES */
const PageInformation = styled(Typography).attrs({
  component: 'p',
  variant: 'body1',
  gutterBottom: true
})`
  margin: 20px 0 !important;
`;

export default compose(
  withRouter,
  connect(
    (state) => ({
      charactersList: state.characters.charactersList,
      isFetchingCharactersList: state.characters.isFetchingCharactersList
    }),
    (dispatch) => ({
      fetchCharactersList: (page) => dispatch(fetchCharactersList(page))
    })
  )
)(CharactersList);
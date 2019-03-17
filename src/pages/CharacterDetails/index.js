/**
 *  Character details page: Shows more information about
 *  a character (Comics, description name, etc)
 */

import React from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import { Button, Typography } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import ClockIcon from '@material-ui/icons/QueryBuilder';
import LeftArrowIcon from '@material-ui/icons/KeyboardArrowLeft';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'redux';
import * as queryString from 'query-string';
import * as moment from 'moment';
import * as PropTypes from 'prop-types';
import Routes, { addParamsToUrl } from '@routes';
import { fetchCharacterDetails } from '@store/characters';
import Comic from './Comic';
import CharacterDetailsPlaceHolder from './CharacterDetailsPlaceHolder';

class CharacterDetails extends React.Component {
  componentDidMount () {
    this.props.fetchCharacterDetails();
  }

  /*  Generate url to go back to the listing page specified
   *  in the from_page query string parameter
   */
  backToListingUrl = () => {
    const { location  } = this.props;

    const fromPage = queryString.parse(location.search).from_page || 1;
    return addParamsToUrl(Routes.CHARACTERS_LIST, { page: fromPage });
  };

  render () {
    const {
      characterDetails,
      isFetchingCharacterDetails
    } = this.props;

    const isLoading = isFetchingCharacterDetails ||
      !Object.keys(characterDetails).length;

    const {
      name,
      modified,
      thumbnail,
      description,
      comics
    } = characterDetails;

    return (
      <Container>
        {/* Back to listing button */}
        <Button
          component={Link}
          to={this.backToListingUrl()}
        >
          <LeftArrowIcon />
          Back to characters list
        </Button>

        {/* CHARACTER */}
        {isLoading ? (
          <CharacterDetailsPlaceHolder />
        ) : (
          <InformationContainer>
            {/* THUMBNAIL & INFORMATION */}
            <Left>
              <CharacterInformation>
                <StyledAvatar
                  src={`${thumbnail.path}.${thumbnail.extension}`}
                  alt={name}
                />
                <CharacterTrivia>
                  <FaceIcon />
                  {name}
                </CharacterTrivia>
                <CharacterTrivia>
                  <ClockIcon />
                  {moment.utc(modified).format('DD/MM/YYYY')}
                </CharacterTrivia>
              </CharacterInformation>
            </Left>


            <Right>
              {/* DESCRIPTION */}
              <Typography
                component='h3'
                variant='h3'
                gutterBottom
                noWrap
              >
                {name}
              </Typography>
              <Typography
                variant='subheading'
                gutterBottom
              >
                {description || 'This character appears to have no description :('}
              </Typography>

              {/* COMICS LIST (Shows 20 comics max) */}
              <ComicsTitle
                variant='h4'
                gutterBottom
              >
                Comics
              </ComicsTitle>
              <ComicsList>
                {comics.length
                  ? comics.slice(0, 20).map((comic) => <Comic key={comic.id} {...comic} />)
                  : <Typography variant='subheading'>This character has no comics available</Typography>
                }
              </ComicsList>
            </Right>
          </InformationContainer>
        )}
      </Container>
    );
  }
}

/* STYLES */
const Container = styled.div`
  padding-top: 20px;
`;

export const InformationContainer = styled(Paper)`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  margin-bottom: 50px;
`;

export const Left = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  width: 200px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;

const CharacterInformation = styled.div`
  position: sticky;
  top: 20px;
`;

export const Right = styled.div`
  flex-grow: 1;
  width: 100%;
  overflow: hidden;
  padding: 20px;
  padding-left: 0;
`;

const StyledAvatar = styled(Avatar)`
  width: 150px !important;
  height: 150px !important;
  margin-bottom: 20px;
`;

const ComicsTitle = styled(Typography).attrs({
  variant: 'h5'
})`
  margin: 20px 0 !important;
`;

const ComicsList = styled.div`
  padding: 15px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  
  > * {
    margin-right: 10px;
  }
`;

const CharacterTrivia = styled(Typography).attrs({
  variant: 'subtitle1'
})`
  display: flex !important;
  align-items: center;
  justify-content: center;
  color: #ABABAB !important;
  
  > *:first-child {
    margin-right: 10px;
  }
`;

/* PROP-TYPES */
CharacterDetails.propTypes = {
  characterDetails: PropTypes.shape({
    name: PropTypes.string,
    modified: PropTypes.string,
    thumbnail: PropTypes.shape({
      path: PropTypes.string,
      extension: PropTypes.string
    }),
    description: PropTypes.string,
    comics: PropTypes.array
  })
};

export default compose(
  withRouter,
  connect(
    (state) => ({
      characterDetails: state.characters.characterDetails,
      isFetchingCharacterDetails: state.characters.isFetchingCharacterDetails
    }),
    (dispatch, props) => ({
      fetchCharacterDetails: () => dispatch(fetchCharacterDetails(props.match.params.characterId))
    })
  )
)(CharacterDetails);
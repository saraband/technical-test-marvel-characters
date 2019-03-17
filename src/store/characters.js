/**
 *  Characters redux module: Stores what we fetch from the Marvel API endpoints
 */

import { combineReducers } from 'redux';
import getFromAPI from '@helpers/getFromAPI';

const FETCH_CHARACTERS_LIST_PENDING = 'FETCH_CHARACTERS_LIST_PENDING';
const FETCH_CHARACTERS_LIST_SUCCESS = 'FETCH_CHARACTERS_LIST_SUCCESS';
const FETCH_CHARACTERS_LIST_FAILED = 'FETCH_CHARACTERS_LIST_FAILED';
const FETCH_CHARACTER_DETAILS_PENDING = 'FETCH_CHARACTER_DETAILS_PENDING';
const FETCH_CHARACTER_DETAILS_SUCCESS = 'FETCH_CHARACTER_DETAILS_SUCCESS';
const FETCH_CHARACTER_DETAILS_FAILED = 'FETCH_CHARACTER_DETAILS_FAILED';

/* CHARACTERS LIST */
const isFetchingCharactersList = (state = false, action) => {
  switch (action.type) {
    case FETCH_CHARACTERS_LIST_PENDING:
      return true;
    case FETCH_CHARACTERS_LIST_SUCCESS:
    case FETCH_CHARACTERS_LIST_FAILED:
      return false;
    default:
      return state;
  }
};

const charactersList = (state = [], action) => {
  switch (action.type) {
    case FETCH_CHARACTERS_LIST_SUCCESS:
      return action.list;
    default:
      return state;
  }
};

/* CHARACTER DETAILS */
const isFetchingCharacterDetails = (state = false, action) => {
  switch (action.type) {
    case FETCH_CHARACTER_DETAILS_PENDING:
      return true;
    case FETCH_CHARACTER_DETAILS_SUCCESS:
    case FETCH_CHARACTER_DETAILS_FAILED:
      return false;
    default:
      return state;
  }
};

const characterDetails = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CHARACTER_DETAILS_SUCCESS:
      return action.details;
    default:
      return state;
  }
};

export const fetchCharactersList = (page = 1) => async (dispatch) => {
  dispatch({ type: FETCH_CHARACTERS_LIST_PENDING });

  // Calculate offset based on the page requested
  const limit = 20;
  const offset = (page - 1) * limit;

  try {
    const res = await getFromAPI('characters', {
      offset,
      limit
    });

    dispatch({
      type: FETCH_CHARACTERS_LIST_SUCCESS,
      list: res.data.results
    });
  } catch (err) {
    console.error(err);
    dispatch({ type: FETCH_CHARACTERS_LIST_FAILED });
  }
};

export const fetchCharacterDetails = (characterId) => async (dispatch) => {
  dispatch({ type: FETCH_CHARACTER_DETAILS_PENDING });

  try {
    const [
      characterDetailsRes,
      characterComicsRes
    ] = await Promise.all([
      getFromAPI(`characters/${characterId}`),
      getFromAPI(`characters/${characterId}/comics`)
    ]);

    dispatch({
      type: FETCH_CHARACTER_DETAILS_SUCCESS,
      details: {
        ...characterDetailsRes.data.results[0],
        comics: characterComicsRes.data.results
      }
    });
  } catch (err) {
    console.error(err);
    dispatch({ type: FETCH_CHARACTER_DETAILS_FAILED });
  }
};

export default combineReducers({
  charactersList,
  isFetchingCharactersList,
  characterDetails,
  isFetchingCharacterDetails
});
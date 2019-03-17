/**
 *  Access a GET endpoint from the marvel API helper
 */

import objToQueryStringParams from '@helpers/objToQueryStringParams';

const BASE_URL = 'https://gateway.marvel.com:443/v1/public/';
const API_KEY = '906ff72879529790a6dcdbe6c5499aba';

export default async function getFromAPI (endpoint, queryStringParams = {}) {
  // Transform the params into a query string and adds the api key
  const queryString = objToQueryStringParams({
    ...queryStringParams,
    apikey: API_KEY
  });

  const res = await fetch(`${BASE_URL}${endpoint}${queryString}`);
  return res.json();
}
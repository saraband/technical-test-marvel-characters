import objToQueryStringParams from '@helpers/objToQueryStringParams';

/*  Helper to add a param to a generic url
 *  e.g. `route/with/:id` => `route/with/42`
 */
export const addParamsToUrl = (url, params, queryStringParams = {}) => {
  // In situ parameters (e.g. :id)
  Object.keys(params).forEach(key => {
    url = url.replace(`:${key}`, params[key]);
  });

  // Query string parameters if they exist
  return `${url}${objToQueryStringParams(queryStringParams)}`;
};

// App main routes
export default {
  HOME: '/',
  CHARACTERS_LIST: '/list/:page',
  CHARACTER_DETAILS: '/character/:characterId'
};
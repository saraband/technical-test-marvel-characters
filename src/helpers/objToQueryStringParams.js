/**
 *  Transforms a param object into a query string
 *  e.g. { foo: 'bar' } => `?foo=bar`
 */

export default function objToQueryString (params) {
  if (!Object.keys(params).length) {
    return '';
  }

  const queryString = Object.keys(params)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');


  return `?${queryString}`;
}
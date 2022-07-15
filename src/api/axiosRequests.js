import axios from 'axios';
import { object, string } from 'prop-types';
import queryString from 'query-string';
import wrapPromise from './wrapPromise';

// url: string, jwtToken: string
export function getData(url, jwtToken) {
  const promise = axios
    .get(url, { headers: { Authorization: 'Bearer '.concat(jwtToken) } })
    .then((res) => res.json())
    .then((res) => res.data);

  return wrapPromise(promise);
}
// url: string, queryParams: object, jwtToken: string
export function getDataWithQueryParams(url, queryParams, jwtToken) {
  // console.log('token==>', queryParams);

  const config = {
    headers: { Authorization: 'Bearer '.concat(jwtToken) },
    params: queryParams,
  };
  const promise = axios
    .get(url, config)
    .then((res) => res.data)
    .catch((err) => console.log('axiosError', err));
  // .then((res) => res.json())
  // .then((res) => res.data);

  return wrapPromise(promise);
}
// url: string, data: object, headers: object
export function postDataWithObject(url, data, jwtToken) {
  const promise = axios
    .post(url, data, { headers: { Authorization: 'Bearer '.concat(jwtToken) } })
    .then((res) => res.json())
    .then((res) => res.data);

  return wrapPromise(promise);
}

// url: string, queryParams: object, jwtToken: string
export function postDataWithQueryParams(url, queryParams, jwtToken) {
  const promise = axios
    .post(url, queryString.stringify(queryParams), {
      headers: { Authorization: 'Bearer '.concat(jwtToken) },
    })
    .then((res) => res.json())
    .then((res) => res.data);

  return wrapPromise(promise);
}

// url: string, queryParams: object, headers: object
export function patchData(url, queryParams, jwtToken) {
  const promise = axios
    .patch(url, queryString.stringify(queryParams), {
      headers: { Authorization: 'Bearer '.concat(jwtToken) },
    })
    .then((res) => res.json())
    .then((res) => res.data);

  return wrapPromise(promise);
}

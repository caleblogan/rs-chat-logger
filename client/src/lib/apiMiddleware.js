import axios from 'axios';
import qs from 'qs';
import config from '../config';

import * as utils from './utils';
import {transformPayload} from "./utils";

const { API_URL } = config.pick('API_URL');

export const CALL_API = 'CALL_API';

export const apiMiddleware = store => next => action => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { type, data, endpoint, method, query } = callAPI;

  console.log('api:', action);

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (typeof type !== 'string') {
    throw new Error('Specify a string type');
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  next(actionWith({ type: `${type}_FETCH` }));

  const headers = {};
  const token =
    store.getState().token || utils.storageGet('token') || 'XXXbjksaldfjionTOKENWOWZERSXXX';
  if (token) {
    headers['Authorization'] = `Token ${token}`;
  }

  const qString = query ? '?' + qs.stringify(query) : '';
  // return axios.get(API_BASE_URL + '/threads/').then(
  return axios({
    method,
    url: API_URL + endpoint + qString,
    data,
    headers
  })
    .then(response => {
      next(
        actionWith({
          type: `${type}_SUCCESS`,
          payload: transformPayload(response.data, '_id'),
        })
      );
      return Promise.resolve(response);
    })
    .catch(error => {
      next(
        actionWith({
          type: `${type}_FAILURE`,
          error: error.message || 'Error during api call'
        })
      );
      // return Promise.reject(error);
    });

  // if (!api.isAuthed()) {
  //   const token = store.getState().token || utils.storageGet('token')
  //   api.auth(token)
  // }
  // return action.fn(store.dispatch, store.getState, api)
};

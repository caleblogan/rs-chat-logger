import * as utils from '../lib/utils';
import { selectors } from '../reducers';
import { CALL_API } from '../lib/apiMiddleware'

export const actionTypes = {
  RECEIVE_MESSAGES: '@message/RECEIVE_MESSAGES',
  FETCH_MESSAGES: '@message/FETCH_MESSAGES',
  SET_SORT_BY: '@message/SET_SORT_BY',
  SET_SORT_ORDER: '@message/SET_SORT_ORDER',
  SET_SEARCH: '@message/SET_SEARCH',
};

function receiveMessages(messages) {
  return {
    type: actionTypes.RECEIVE_MESSAGES,
    payload: messages,
  };
}

export function setSortBy(sortBy) {
  return {
    type: actionTypes.SET_SORT_BY,
    sortBy,
  };
}

export function setSortOrder(sortOrder) {
  return {
    type: actionTypes.SET_SORT_ORDER,
    sortOrder,
  };
}

export function setSearch(search) {
  return {
    type: actionTypes.SET_SEARCH,
    search,
  };
}

let socket;
export function startMessageStream() {
  return (dispatch) => {
    socket = new WebSocket('ws://localhost:8000' + '/api/v1/messages/stream');

    socket.addEventListener('message', event => {
      const message = JSON.parse(event.data);
      dispatch(
        receiveMessages(utils.transformPayload([message], '_id'))
      );
    });
  }
}

export function stopMessageStream() {
  return (dispatch) => {
    socket.close();
  }
}

export function fetchMessages() {
  return (dispatch, getState) => {
    const state = getState();
    const { limit, offset } = selectors.messages.pagination(state);
    const sortBy = selectors.messages.sortBy(state);
    const sortOrder = selectors.messages.sortOrder(state);
    const search = selectors.messages.search(state);
    const query = {
      limit,
      offset,
      sort: sortBy,
      sort_order: sortOrder,
    };
    search && search.trim() ? (query['q'] = search) : '';
    return dispatch({
      [CALL_API]: {
        type: actionTypes.FETCH_MESSAGES,
        endpoint: `/messages`,
        method: 'GET',
        query,
      }
    });
  }
}

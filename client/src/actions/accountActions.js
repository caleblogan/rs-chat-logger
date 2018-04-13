import * as utils from '../lib/utils';
import { selectors } from '../reducers';
import { CALL_API } from '../lib/apiMiddleware'

export const actionTypes = {
  ACCOUNTS: '@accounts/ACCOUNTS',
  MESSAGES: '@accounts/MESSAGES',
};

export function fetchTopAccounts() {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        type: actionTypes.ACCOUNTS,
        endpoint: `/messages/top-accounts`,
        method: 'GET',
      }
    });
  }
}


export function fetchAccountMessages(username) {
  return (dispatch, getState) => {
    // const state = getState();
    // const { limit, offset } = selectors.messages.pagination(state);
    // const sortBy = selectors.messages.sortBy(state);
    // const sortOrder = selectors.messages.sortOrder(state);
    // const search = selectors.messages.search(state);
    // const query = {
    //   limit,
    //   offset,
    //   sort: sortBy,
    //   sort_order: sortOrder,
    // };
    // search && search.trim() ? (query['q'] = search) : '';
    return dispatch({
      [CALL_API]: {
        type: actionTypes.MESSAGES,
        endpoint: `/accounts/${username}/messages`,
        method: 'GET',
        // query,
      },
      username,
    });
  }
}

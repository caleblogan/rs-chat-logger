import * as utils from '../lib/utils';
import { selectors } from '../reducers';
import { CALL_API } from '../lib/apiMiddleware'

export const actionTypes = {
  ACCOUNTS: '@accounts/ACCOUNTS',
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

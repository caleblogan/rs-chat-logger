import * as utils from '../lib/utils';
import { selectors } from '../reducers';
import { CALL_API } from '../lib/apiMiddleware'

export const actionTypes = {
  WORD_COUNTS: '@charts/WORD_COUNTS',
  WORD_COUNTS_OVER_TIME: '@charts/WORD_COUNTS_OVER_TIME',
};

export function fetchWordCounts() {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        type: actionTypes.WORD_COUNTS,
        endpoint: `/charts/word-counts`,
        method: 'GET',
      }
    });
  }
}

export function fetchWordsOverTime() {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        type: actionTypes.WORD_COUNTS_OVER_TIME,
        endpoint: `/charts/word-counts-over-time`,
        method: 'GET',
      }
    });
  }
}

import { combineReducers } from 'redux';
import { actionTypes } from '../actions/accountActions';

function accounts(state = {}, action) {
  switch (action.type) {
    case `${actionTypes.ACCOUNTS}_SUCCESS`:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
}

function isFetchingReducer(state = false, action) {
  switch (action.type) {
    case `${actionTypes.ACCOUNTS}_FETCH`:
      return true;
    case `${actionTypes.ACCOUNTS}_SUCCESS`:
    case `${actionTypes.ACCOUNTS}_FAILURE`:
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  accounts,
  isFetching: isFetchingReducer,
});

// Selectors
export const list = state =>
  Object.keys(state.accounts).map(id => state.accounts[id]);
export const isFetching = state => state.isFetching;

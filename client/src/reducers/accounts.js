import { combineReducers } from 'redux';
import _ from 'lodash';
import { actionTypes } from '../actions/accountActions';

function messages(state = {}, action) {
  switch (action.type) {
    case `${actionTypes.MESSAGES}_SUCCESS`:
      return {
        [action.username]: {
          ...action.payload,
        },
      };
    case actionTypes.SET_SORT_BY:
    case actionTypes.SET_SORT_ORDER:
    case actionTypes.SET_SEARCH:
      return {};
    default:
      return state;
  }
}

function sortByReducer(state = 'created_at', action) {
  switch (action.type) {
    case actionTypes.SET_SORT_BY:
      return action.sortBy;
    default:
      return state;
  }
}

function sortOrderReducer(state = 'asc', action) {
  switch (action.type) {
    case actionTypes.SET_SORT_ORDER:
      return action.sortOrder;
    default:
      return state;
  }
}

function searchReducer(state = '', action) {
  switch (action.type) {
    case actionTypes.SET_SEARCH:
      return action.search;
    default:
      return state;
  }
}

const defaultPagination = {
  limit: 50,
  offset: 0,
};
function paginationReducer(state = defaultPagination, action) {
  switch (action.type) {
    case `${actionTypes.MESSAGES}_SUCCESS`:
      return {
        ...state,
        offset: state.offset + state.limit
      };
    case actionTypes.SET_SORT_BY:
    case actionTypes.SET_SORT_ORDER:
    case actionTypes.SET_SEARCH:
      return {...defaultPagination};
    default:
      return state;
  }
}

function isFetchingReducer(state = false, action) {
  switch (action.type) {
    case `${actionTypes.MESSAGES}_FETCH`:
      return true;
    case `${actionTypes.MESSAGES}_SUCCESS`:
    case `${actionTypes.MESSAGES}_FAILURE`:
      return false;
    default:
      return state;
  }
}


export default combineReducers({
  messages,
  sortBy: sortByReducer,
  sortOrder: sortOrderReducer,
  search: searchReducer,
  pagination: paginationReducer,
  isFetching: isFetchingReducer,
});


// Selectors
export const messageList = (state, username) =>
  _.keys(_.get(state.messages, username, {}))
    .map(id => state.messages[username][id]);
export const sortBy = state => state.sortBy;
export const sortOrder = state => state.sortOrder;
export const search = state => state.search;
export const pagination = state => state.pagination;
export const isFetching = state => state.isFetching;

import { combineReducers } from 'redux';
import { actionTypes } from '../actions/messageActions';

const defaultMessages = {
  [123]: {
    _id: '123',
    "username": "FarLye06090",
    "message": "[Farlye06090] [50k] - [11350k] [54 - 100] Good luck |16:40:26|",
    "type": "PLAYER",
    "tile": "3162 3483 0",
    "locationName": "Varrock Ge",
    "world": 301,
    "created_at": "2018-04-09T16:41:15.549Z",
  },
  [124]: {
    _id: '124',
    "username": "Jager0nem",
    "message": "Buying all green d hide body !!!!",
    "type": "PLAYER",
    "tile": "3166 3483 0",
    "locationName": "Varrock Ge",
    "world": 301,
    "created_at": "2018-04-09T16:41:19.027Z",
  },
};

function messages(state = {}, action) {
  switch (action.type) {
    case `${actionTypes.FETCH_MESSAGES}_SUCCESS`:
      return {
        ...state,
        ...action.payload,
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
    case `${actionTypes.FETCH_MESSAGES}_SUCCESS`:
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
    case `${actionTypes.FETCH_MESSAGES}_FETCH`:
      return true;
    case `${actionTypes.FETCH_MESSAGES}_SUCCESS`:
    case `${actionTypes.FETCH_MESSAGES}_FAILURE`:
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
export const messageList = state =>
  Object.keys(state.messages).map(id => state.messages[id]);
export const sortBy = state => state.sortBy;
export const sortOrder = state => state.sortOrder;
export const search = state => state.search;
export const pagination = state => state.pagination;
export const isFetching = state => state.isFetching;

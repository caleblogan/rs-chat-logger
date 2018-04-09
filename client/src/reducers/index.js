import { combineReducers } from 'redux';

import authReducer, * as authSelectors from './auth';

export default combineReducers({
  auth: authReducer,
});

export const selectors = {
  auth: {
    isLoggedIn: state => authSelectors.isLoggedIn(state.auth),
  },
};

import { combineReducers } from 'redux';

import authReducer, * as authSelectors from './auth';
import messagesReducer, * as messagesSelectors from './messages';

export default combineReducers({
  auth: authReducer,
  messages: messagesReducer,
});

export const selectors = {
  auth: {
    isLoggedIn: state => authSelectors.isLoggedIn(state.auth),
  },
  messages: {
    messageList: state => messagesSelectors.messageList(state.messages),
  },
};

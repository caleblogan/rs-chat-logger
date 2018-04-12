import { combineReducers } from 'redux';

import authReducer, * as authSelectors from './auth';
import messagestreamReducer, * as messagestreamSelectors from './messagestream';
import messagesReducer, * as messagesSelectors from './messages';

export default combineReducers({
  auth: authReducer,
  messagestream: messagestreamReducer,
  messages: messagesReducer,
});

export const selectors = {
  auth: {
    isLoggedIn: state => authSelectors.isLoggedIn(state.auth),
  },
  messagestream: {
    messageList: state => messagestreamSelectors.messageList(state.messagestream),
  },
  messages: {
    messageList: state => messagesSelectors.messageList(state.messages),
    sortBy: state => messagesSelectors.sortBy(state.messages),
    sortOrder: state => messagesSelectors.sortOrder(state.messages),
    search: state => messagesSelectors.search(state.messages),
    pagination: state => messagesSelectors.pagination(state.messages),
    isFetching: state => messagesSelectors.isFetching(state.messages),
  },
};

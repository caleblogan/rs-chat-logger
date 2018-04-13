import { combineReducers } from 'redux';

import authReducer, * as authSelectors from './auth';
import messagestreamReducer, * as messagestreamSelectors from './messagestream';
import messagesReducer, * as messagesSelectors from './messages';
import topAccountsReducer, * as topAccountsSelectors from './topAccounts';
import accountsReducer, * as accountsSelectors from './accounts';

export default combineReducers({
  auth: authReducer,
  messagestream: messagestreamReducer,
  messages: messagesReducer,
  topAccounts: topAccountsReducer,
  accounts: accountsReducer,
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
  topAccounts: {
    list: state => topAccountsSelectors.list(state.topAccounts),
    isFetching: state => topAccountsSelectors.isFetching(state.topAccounts),
  },
  accounts: {
    messageList: (state, username) => accountsSelectors.messageList(state.accounts, username),
    sortBy: state => accountsSelectors.sortBy(state.accounts),
    sortOrder: state => accountsSelectors.sortOrder(state.accounts),
    search: state => accountsSelectors.search(state.accounts),
    pagination: state => accountsSelectors.pagination(state.accounts),
    isFetching: state => accountsSelectors.isFetching(state.accounts),
  },
};

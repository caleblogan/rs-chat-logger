import * as utils from '../lib/utils';
import { selectors } from '../reducers';
import { selectActiveAccount } from '../helpers/auth';

export const actionTypes = {
  ADD_ACCOUNT: 'ADD_ACCOUNT',
  REMOVE_ACCOUNT: 'REMOVE_ACCOUNT',
  SET_ACTIVE_ACCOUNT: 'SET_ACTIVE_ACCOUNT',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT'
};

function addAccount(username, keys) {
  utils.storagePut('accounts', {
    ...utils.storageGet('accounts'),
    [username]: keys
  });
  return {
    type: actionTypes.ADD_ACCOUNT,
    username,
    keys
  };
}

function removeAccount(username) {
  const newAccounts = { ...utils.storageGet('accounts') };
  delete newAccounts[username];
  utils.storagePut('accounts', newAccounts);
  return {
    type: actionTypes.REMOVE_ACCOUNT,
    username
  };
}

export function setActiveAccount(username) {
  utils.storagePut('activeAccount', username);
  return {
    type: actionTypes.SET_ACTIVE_ACCOUNT,
    username
  };
}


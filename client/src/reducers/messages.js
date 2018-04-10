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

function messages(state = defaultMessages, action) {
  switch (action.type) {
    case actionTypes.RECEIVE_MESSAGES:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

export default combineReducers({
  messages,
});

// Selectors
export const messageList = state =>
  Object.keys(state.messages).map(id => state.messages[id]);

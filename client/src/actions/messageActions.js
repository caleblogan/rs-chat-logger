import * as utils from '../lib/utils';
import { selectors } from '../reducers';

export const actionTypes = {
  RECEIVE_MESSAGES: '@message/RECEIVE_MESSAGES',
};

function receiveMessages(messages) {
  return {
    type: actionTypes.RECEIVE_MESSAGES,
    payload: messages,
  };
}

let socket;
export function startMessageStream() {
  return (dispatch) => {
    socket = new WebSocket('ws://localhost:8000' + '/api/v1/messages/stream');

    socket.addEventListener('message', event => {
      const message = JSON.parse(event.data);
      dispatch(
        receiveMessages(utils.transformPayload([message], '_id'))
      );
    });
  }
}

export function stopMessageStream() {
  return (dispatch) => {
    socket.close();
  }
}

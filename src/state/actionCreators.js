import { flow, isEmpty, trim } from 'lodash/fp';

import actionTypes from 'state/actionTypes';

const isStringEmpty = flow(trim, isEmpty);


/**
 * action creators
 */
export const setUsername = username => ({
  type: actionCreators.SET_USERNAME,
  data: { username },
});

export const setCursor = cursor => ({
  type: actionCreators.SET_CURSOR,
  data: { cursor },
});

export const setPosition = ({ x, y }) => (dispatch, getState) => {
  const { connection: { isIdentified } } = getState();
  if (isIdentified) {
    dispatch({
      type: actionCreators.SET_POSITION,
      data: { x, y },
    });
  } else {
    return null;
  }
};

export const setShouldPersistIdentity = shouldPersistIdentity => ({
  type: actionCreators.SET_SHOULD_PERSIST_IDENTITY,
  data: { shouldPersistIdentity },
});

export const identify = () => (dispatch, getState) => {
  // Emit username and cursor at the same time to avoid weirdness
  const { self: { username, cursor } } = getState();
  if (!isStringEmpty(username) && cursor) {
    dispatch({
      type: actionCreators.IDENTIFY,
      data: {
        username,
        cursor,
      }
    });
  } else {
    // TODO return validation error or s/t
    return null;
  }
};

export const clearIdentity = () => ({
  type: actionCreators.CLEAR_IDENTITY,
});

export const sendMessage = message => ({
  type: actionCreators.SEND_MESSAGE,
  data: { message },
});

export const setSocketId = socketId => ({
  type: actionCreators.SET_SOCKET_ID,
  data: { socketId },
});

export const socketConnect = () => ({
  type: actionCreators.SET_IS_CONNECTED,
  data: { isConnected: true, }
});

export const socketDisconnect = () => ({
  type: actionCreators.SET_IS_CONNECTED,
  data: { isConnected: false, }
});
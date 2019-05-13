import { flow, isEmpty, trim } from 'lodash/fp';

const isStringEmpty = flow(trim, isEmpty);


/**
 * action creators
 */
export const setUsername = username => ({
  type: SET_USERNAME,
  data: { username },
});

export const setCursor = cursor => ({
  type: SET_CURSOR,
  data: { cursor },
});

export const setPosition = ({ x, y }) => (dispatch, getState) => {
  const { connection: { isIdentified } } = getState();
  if (isIdentified) {
    dispatch({
      type: SET_POSITION,
      data: { x, y },
    });
  } else {
    return null;
  }
};

export const setShouldPersistIdentity = shouldPersistIdentity => ({
  type: SET_SHOULD_PERSIST_IDENTITY,
  data: { shouldPersistIdentity },
});

export const identify = () => (dispatch, getState) => {
  // Emit username and cursor at the same time to avoid weirdness
  const { self: { username, cursor } } = getState();
  if (!isStringEmpty(username) && cursor) {
    dispatch({
      type: IDENTIFY,
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
  type: CLEAR_IDENTITY,
});

export const sendMessage = message => ({
  type: SEND_MESSAGE,
  data: { message },
});

export const setSocketId = socketId => ({
  type: SET_SOCKET_ID,
  data: { socketId },
});

export const socketConnect = () => ({
  type: SET_IS_CONNECTED,
  data: { isConnected: true, }
});

export const socketDisconnect = () => ({
  type: SET_IS_CONNECTED,
  data: { isConnected: false, }
});
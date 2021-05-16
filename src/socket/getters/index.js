import { MESSAGE_TYPE } from '../constants';
import { getPongResponse } from './get-pong-response';
import { getNewMessageResponse } from './get-new-message-response';
import { setChatUser } from '../setters/set-chat-user';

export const getResponse = ({ message: { type, payload }, client, socket }) => {
  const params = { payload, client, socket };

  switch (type) {
    case MESSAGE_TYPE.PING_REQUEST:
      return getPongResponse(params);
    case MESSAGE_TYPE.CHAT_SEND_MESSAGE:
      return getNewMessageResponse(params);
    case MESSAGE_TYPE.CHAT_SET_USER:
      return setChatUser(params);
    default: return ({
      method: () => false,
      message: {},
    });
  }
};
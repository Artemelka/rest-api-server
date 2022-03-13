import { MESSAGE_TYPE } from '../constants.js';

export const getPongResponse = ({ client }) => {
  const message = {
    type: MESSAGE_TYPE.PING_RESPONSE,
    payload: {
      timestamp: Date.now()
    }
  };

  return ({
    method: (data) => client.send(data),
    message,
  });
}
import { MESSAGE_TYPE } from '../constants';
import { v4 as getId } from 'uuid';

const chat = [];

export const getNewMessageResponse = ({ payload, client, socket }) => {
  chat.push(payload);

  const message = {
    type: MESSAGE_TYPE.CHAT_NEW_MESSAGE,
    payload: {...payload, userId: client.id, id: getId()},
  }

  return ({
    method: (data) => {
      socket.clients.forEach(user => {
          user.send(data);
      });
    },
    message,
  });
}

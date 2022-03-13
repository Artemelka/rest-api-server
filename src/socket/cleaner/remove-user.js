import { usersList } from '../db.js';
import { MESSAGE_TYPE } from '../constants.js';

export const removeUser = ({ client, socket }) => {
  usersList.removeUser(client.id);

  const nextUsersList = usersList.getUsers();

  socket.clients.forEach(user => {
    if (user.id !== client.id) {
      user.send(JSON.stringify({
        type: MESSAGE_TYPE.CHAT_USER_LEFT,
        payload: {
          usersList: nextUsersList.filter(userItem => userItem.userId !== user.id)
        }
      }))
    }
  });
};
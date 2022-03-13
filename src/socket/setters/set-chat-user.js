import { MESSAGE_TYPE } from '../constants.js';
import { usersList } from '../db.js';

// const rooms = {};

export const setChatUser = ({ payload, client, socket }) => {
  // rooms[payload.roomId] = rooms[payload.roomId]
  //   ? [...rooms[payload.roomId] , client.id]
  //   : [client.id];

  const newUser = {
    name: payload.name,
    roomId: payload.roomId,
    userId: client.id,

  };
  const messageBroadcast = {
    type: MESSAGE_TYPE.CHAT_NEW_USER,
    payload: newUser,
  };
  const filteredUsersList = usersList.getUsersWithoutClient(newUser.userId);

  client.userName = newUser.name;
  usersList.addUser(newUser);

  return ({
    method: (data) => {
      socket.clients.forEach(user => {
        if (client.id !== user.id) {
          // if (rooms[payload.roomId].includes(user.id)) {
            user.send(data);
          // }
        }
      });

      client.send(JSON.stringify({
        type: MESSAGE_TYPE.CHAT_SET_USER,
        payload: {
          user: newUser,
          usersList: filteredUsersList,
        },
      }))
    },
    message: messageBroadcast,
  });
}
import WebSocket from 'ws';
import { v4 as getId } from 'uuid';
import { ServerParams } from '../constants.js';
import { handleSocketStart } from './handlers.js';
import { getResponse } from './getters/index.js';
import { removeUser } from './cleaner/remove-user.js';

const SOCKET_PARAMS = { port: ServerParams.SOCKET_PORT };
const HEARTBEAT_INTERVAL = 60000;

function noop() {}

function heartbeat() {
  this.isAlive = true;
}

export const startSocketServer = () => {
  const socket = new WebSocket.Server(SOCKET_PARAMS, handleSocketStart);

  const interval = setInterval(() => {
    socket.clients.forEach(ws => {
      if (ws.isAlive === false) {
        return ws.terminate();
      }

      ws.isAlive = false;
      ws.ping(noop);
    });
  }, HEARTBEAT_INTERVAL);

  socket.on('connection', client => {
    client.isAlive = true;
    client.rooms = [];
    client.id = getId();
    client.on('pong', heartbeat);

    console.log('=== client connected ===', client.id);

    client.on('message', (msg) => {
      const normalizeMessage = JSON.parse(msg);
      console.log('=== new message ===', normalizeMessage);

      const { method, message } = getResponse({ message: normalizeMessage, client, socket });

      method(JSON.stringify(message));
      console.log('=== send ===', message);
    });

    client.on('close', (code) => {
      console.log('=== client close ===', code);
      removeUser({ client, socket })
    });
  });

  socket.on('close', client => {
    clearInterval(interval);
    console.log('=== socket close ===', client);
  });
};
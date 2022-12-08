import mongoose from 'mongoose';
import { startHttpServer } from './http/http-server.js';
import { handleDbConnection, handleDbConnectionError } from './http/handlers.js';
import { startSocketServer } from './socket/socket-server.js';
import { DB_URI, DbConnectParams } from './constants.js';

mongoose.connect(DB_URI, DbConnectParams)
  .then(handleDbConnection)
  .then(startHttpServer)
  .then(startSocketServer)
  .catch((error) => {
      handleDbConnectionError(error);
      startHttpServer();
  });

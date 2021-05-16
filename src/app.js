import mongoose from 'mongoose';
import { startHttpServer } from './http/http-server';
import { handleDbConnection, handleDbConnectionError } from './http/handlers';
import { startSocketServer } from './socket/socket-server';
import { DB_URI, DbConnectParams } from './constants';

mongoose.connect(DB_URI, DbConnectParams)
  .then(handleDbConnection)
  .then(startHttpServer)
  .then(startSocketServer)
  .catch(handleDbConnectionError);









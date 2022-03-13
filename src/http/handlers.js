import { DB_NAME, ProxyParams } from '../constants.js';

export const handleServerStart = error => error
    ? console.error('==== Server not started! ==== ERROR:', error)
    : console.log(`==== Server started on ${ProxyParams.SERVER}`);

export const handleDbConnection = () =>
  console.log(`==== Connected to MongoDB ${DB_NAME}! ====`);

export const handleDbConnectionError = error =>
  console.error('==== MongoDB connected error ====', error);

export const handleErrorCreator = (text, response, status = 503) =>
    error => {
        console.error(text, error);
        response.sendStatus(status)
    };

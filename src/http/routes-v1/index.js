import express from 'express';
import { getUserName } from './get-user-name/index.js';
import { localization } from './localization/index.js';
import { auth } from './auth/index.js';

const expressRoutes = express.Router();

expressRoutes.use('/', (req, res, next) => {
  console.log('=== req.url ===', req.url);
  next();
});
expressRoutes.use('/get-user-name', getUserName);
expressRoutes.use('/localization', localization);
expressRoutes.use('/auth', auth);

export const routes = expressRoutes;

import express from 'express';
import { getUserName } from './get-user-name';
import { localization } from './localization';

const routes = express.Router();

routes.use('/', (req, res, next) => {
  console.log('=== req.url ===', req.url);
  next();
});
routes.use('/get-user-name', getUserName);
routes.use('/localization', localization);

module.exports = routes;

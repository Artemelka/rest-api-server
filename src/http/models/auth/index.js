import { LowDb } from '../../../services/low-db/index.js';

export const AuthModel = new LowDb({ fileName: 'users' });
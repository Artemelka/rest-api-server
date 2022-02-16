import express from 'express';
import { AuthController } from '../../controllers';

export const auth = express.Router();

auth.post('/', AuthController.init);
auth.post('/login', AuthController.logIn);
auth.get('/logout', AuthController.logOut);
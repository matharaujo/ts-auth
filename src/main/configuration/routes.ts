import express from 'express';

import authMiddleware from './auth-middleware';

import UserController from '../controllers/user-controller';
import AuthController from '../controllers/auth-controller';

export default (app: express.Application) => {
    app.post('/users', UserController.store);
    app.get('/users', authMiddleware, UserController.index);
    app.post('/auth', AuthController.authenticate);
}

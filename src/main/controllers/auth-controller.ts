import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../entities/User';

class AuthController {
    async authenticate(request: Request, response: Response, next: NextFunction) {
        const repository = getRepository(User);
        const { email, password } = request.body;

        if(!email) next(createError(400, 'Email is obrigatory! Verify!'));
        if(!password) next(createError(400, 'Password is obrigatory! Verify!'));

        const user = await repository.findOne({ where: { email } });
        if(!user) throw new createError.Unauthorized('The user not exists! Verify!');

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) throw new createError.Unauthorized('Incorrect password! Verify!');

        const token = jwt.sign({ id: user.id }, 'xii', { expiresIn: '1d' });

        return response.json({
            id: user.id,
            email: user.email,
            token,
        });
    };
}

export default new AuthController();

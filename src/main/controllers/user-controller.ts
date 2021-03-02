import {NextFunction, Request, Response} from 'express';
import createError from 'http-errors';
import { getRepository } from 'typeorm';

import User from '../entities/User';

class UserController {
    async index(request: Request, response: Response) {
        response.json({
            userId: request.userId,
            status: 'Logged 🎉️',
        })
    }

    async store(request: Request, response: Response, next: NextFunction) {
        const repository = getRepository(User);
        const { email, password } = request.body;

        if(!email) next(createError(400, 'Email is obrigatory! Verify!'));
        if(!password) next(createError(400, 'Password is obrigatory! Verify!'));

        const userExists = await repository.findOne({ where: { email } });

        if (userExists) next(createError(409, 'The user already exists! Verify!'));

        const user = repository.create({ email, password });
        await repository.save(user);

        return response.json({
            id: user.id,
            email: user.email,
            password: user.password,
        });
    };
}

export default new UserController();

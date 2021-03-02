import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

export default function authMiddleware(request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers;
    if(!authorization) throw new createError.Unauthorized('Invalid token! Verify!');

    const token = authorization.replace('Bearer', '').trim();

    try {
        const data = jwt.verify(token, 'xii');

        const { id } = data as TokenPayload;

        request.userId = id;
        next();
    } catch {
        throw new createError.Unauthorized('Invalid token! Verify!');
    }
}

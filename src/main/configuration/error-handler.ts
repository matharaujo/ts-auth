import { Request, Response, NextFunction } from 'express';

export default (error: any, request: Request, response: Response, next: NextFunction) => {
    return response.status(error.statusCode || 500).json({
        message: 'Ops! An error occurred 😓️ Try Again!',
        error: error.message || '',
    });
}

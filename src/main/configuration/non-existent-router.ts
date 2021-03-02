import { Application, Request, Response } from 'express';

export default (app: Application) => {
    app.use('*', (request: Request, response: Response) => {
        response.status(404).send({
            message: 'Ops! An error occurred 😓️ Try Again!',
            error: `Apparently this route ${request.originalUrl} does not exist!`,
        });
    });
}

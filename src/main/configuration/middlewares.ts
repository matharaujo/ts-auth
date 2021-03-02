import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors';

export default (app: express.Application) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());
}

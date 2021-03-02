import 'reflect-metadata';
import express from 'express';
import setupMiddlewares from './middlewares';
import setupRoutes from './routes';
import nonExistentRouter from './non-existent-router';
import setupTypeorm from './typeorm-connect';
import errorHandler from './error-handler';

class App {
    public app: express.Application;

    constructor(app: express.Application) {
      this.app = app;

      this.createServer(app);
    };

    public createServer(app: express.Application) {
      setupTypeorm()
        .then(() => {
          setupMiddlewares(app);
          setupRoutes(app);
          nonExistentRouter(app);
          app.use(errorHandler);

          const portApi = 8000;
          app.listen(portApi, () => console.log(`Server running at http://localhost:${portApi}`));
        })
        .catch((error) => {
          console.error(error);
        });
    };
}

export default App;

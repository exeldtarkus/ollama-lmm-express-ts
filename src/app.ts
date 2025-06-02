import express, {Express} from 'express';
import bodyParser from 'body-parser';
import {indexRouter} from './routes/index.route';
import errorHandler from './app/https/middleware/error.middleware';
import mainMiddleware from './app/https/middleware/main.request.middleware';
import loggerMiddleware from './app/https/middleware/logger.middleware';
import {BaseErrorResource} from './app/https/resources/base.error.response';
import {swaggerSpec} from './app/configs/swagger.config';
import swaggerUi from 'swagger-ui-express';

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text({type: '*/*'}));

app.use(mainMiddleware);
app.use(loggerMiddleware);

app.use(indexRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res, next) => {
  next(
    BaseErrorResource.NotFound(
      `Route [${req.method}] - [${req.originalUrl}] - Not found`,
    ),
  );
});

app.use(errorHandler);

export default app;

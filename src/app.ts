import express from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import './database/connection';

import { ErrorHandler } from './errors/error-handler';

import swaggerDocs from './swagger.json';

import { employeesRouter } from './routes/employees-routes';

const app = express();
const errorHandler = new ErrorHandler();

app.use(express.json());
app.use(helmet());
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(employeesRouter);
app.use(errorHandler.handleError);

export { app };

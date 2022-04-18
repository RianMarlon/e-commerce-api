import express from 'express';
import helmet from 'helmet';
import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import './database/connection';

import { ErrorHandler } from './errors/error-handler';

const app = express();
const errorHandler = new ErrorHandler();

app.use(express.json());
app.use(helmet());
app.use(errorHandler.handleError);

export { app };

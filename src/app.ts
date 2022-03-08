import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import 'reflect-metadata';

import './database/connection';

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());

export { app };

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { scrubsRouter } from './router/scrubs.router.js';

export const app = express();
app.disable('x-powered-by');
app.use(morgan('dev'));
const corsOrigins = {
  origin: '*',
};
app.use(cors(corsOrigins)); // NOSONAR not using secure environment
app.use(express.json());

app.use('/scrubs', scrubsRouter);

import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { scrubsRouter } from './routers/scrubs.router.js';

export const app = express();
app.disable('x-powered-by');
app.use(morgan('dev'));
const corsOrigins = {
  origin: '*',
};
app.use(cors(corsOrigins)); // NOSONAR not using secure environment
app.use(express.json());
app.use((_error: Error, _req: Request, resp: Response, _next: NextFunction) => {
  console.log('Soy el middleware de errores');
  resp.json({
    error: [],
  });
});

app.use('/scrubs', scrubsRouter);

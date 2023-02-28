import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { scrubsRouter } from './routers/scrubs.router.js';
import { CustomError } from './errors/errors.js';
import createDebug from 'debug';

const debug = createDebug('W6B:App');

export const app = express();

app.use(express.static('public'));

app.disable('x-powered-by');
app.use(morgan('dev'));
const corsOrigins = {
  origin: '*',
};
app.use(cors(corsOrigins)); // NOSONAR not using secure environment
app.use(express.json());

app.use('/favicon', express.static('../public'));

app.use('/scrubs', scrubsRouter);
app.use('/', (_req, resp) => {
  resp.json({
    info: 'Scrubs API project -- Iván Durán',
    endopoints: {
      scrubs: '/scrubs',
    },
  });
});

app.use(
  (error: CustomError, _req: Request, resp: Response, _next: NextFunction) => {
    const status = error.statusCode || 500;
    const statusMessage = error.statusMessage || 'Internal Server Error';
    resp.status(status);
    debug(status, statusMessage, error.name, error.message);

    resp.json({
      error: [{ status, statusMessage }],
    });
  }
);

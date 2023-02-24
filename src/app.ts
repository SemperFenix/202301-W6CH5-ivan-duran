import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

export const app = express();
app.disable('x-powered-by');
app.use(morgan('dev'));
const corsOrigins = {
  origin: '*',
};
app.use(cors(corsOrigins));
app.use(express.json());

app.use('/scrubs', scrubsRouter);

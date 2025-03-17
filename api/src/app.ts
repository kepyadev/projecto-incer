import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { Express } from 'express';
import passport from 'passport';

import { HTTP } from './constants';
import routes from './routes';

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use('/api', cors(), routes);

app.use((_req, res) => {
  // eslint-disable-next-line no-console
  console.log('ROTA NAO ENCONTRADA: ', _req.path);
  res.status(HTTP.NOT_FOUND);
  res.send({ msg: 'Lamentamos, o recurso não existe' });
});

app.use(passport.initialize());
app.use(passport.session());

export default app;

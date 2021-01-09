import 'reflect-metadata';
import { errors } from 'celebrate';
import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import 'dotenv/config';

import storageConfig from '@config/storage';

import routes from './routes';
import handlerAppErrors from './middlewares/handlerAppErrors';
import rateLimit from './middlewares/rateLimiter';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(storageConfig.uploadFolderPath));
app.use(rateLimit);
app.use(routes);
app.use(errors());
app.use(handlerAppErrors);

app.listen(3333, () => {
  console.log('Server started on port 3333');
});

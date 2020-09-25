import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import uploadConfig from '@config/upload';

import routes from './routes';
import handlerAppErrors from './middlewares/handlerAppErrors';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadFolderPath));
app.use(routes);
app.use(handlerAppErrors);

app.listen(3333, () => {
  console.log('Server started on port 3333');
});

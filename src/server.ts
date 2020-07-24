import express from 'express';
import 'express-async-errors';

import routes from './routes';
import handlerAppErrors from './middlewares/handlerAppErrors';

import uploadConfig from './config/upload';
import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(handlerAppErrors);

app.listen(3333, () => {
  console.log('Server started on port 3333');
});

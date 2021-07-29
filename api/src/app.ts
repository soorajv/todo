import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import cors from 'cors';
import { todoGetRouter } from './routes/todo-get';
import { todoPostRouter } from './routes/todo-post';
import { todoPutRouter } from './routes/todo-put';
import { todoDeleteRouter } from './routes/todo-delete';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.use(cors());
app.use(json());

app.use(todoGetRouter);
app.use(todoPostRouter);
app.use(todoPutRouter);
app.use(todoDeleteRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError('Route not found');
});

app.use(errorHandler);

export { app };

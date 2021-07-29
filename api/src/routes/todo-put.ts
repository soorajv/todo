import express from 'express';

import { validateTodoPutRequest } from './validations/validateTodoRequest';

import { putTodo } from '../services/todo.service';

const router = express.Router();

router.put('/v1/todo/:id', validateTodoPutRequest(), putTodo);
export { router as todoPutRouter };

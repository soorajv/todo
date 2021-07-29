import express from 'express';

import { validateTodoDeleteRequest } from './validations/validateTodoRequest';

import { deleteTodo } from '../services/todo.service';

const router = express.Router();

router.delete('/v1/todo/:id', validateTodoDeleteRequest(), deleteTodo);
export { router as todoDeleteRouter };

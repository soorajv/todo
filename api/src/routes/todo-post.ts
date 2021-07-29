import express from 'express';

import { validateTodoPostRequest } from './validations/validateTodoRequest';

import { postTodo } from '../services/todo.service';

const router = express.Router();

router.post('/v1/todo', validateTodoPostRequest(), postTodo);
export { router as todoPostRouter };

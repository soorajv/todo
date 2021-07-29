import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import config from 'config';
import { ServerError } from '../errors/server-error';
import { NotFoundError } from '../errors/not-found-error';

import { TodoItem } from '../models/todo';
import { promises as fs } from 'fs';

export const postTodo = async (req: Request, res: Response) => {
  const id = uuidv4();
  let todoState = await getTodoState();

  const todoItem = <TodoItem>{};
  todoItem.id = id;
  todoItem.text = req.body.text;
  todoItem.done = req.body.done;

  todoState[id] = todoItem;
  const newTododState = await saveTodoState(todoState);

  return res.status(201).json(newTododState);
};

export const getTodo = async (req: Request, res: Response) => {
  const todoState = await getTodoState();

  return res.status(200).json(todoState);
};

export const deleteTodo = async (req: Request, res: Response) => {
  const id = req.params.id;
  const todoState = await getTodoState();

  const updateItem = todoState[id];

  if (!updateItem) {
    throw new NotFoundError('Resource Not Found');
  } else {
    delete todoState[id];
    await saveTodoState(todoState);
    return res.status(204).json();
  }
};

export const putTodo = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { text, done } = req.body;
  let todoState = await getTodoState();
  const updateItem = todoState[id];

  if (!updateItem) {
    throw new NotFoundError('Resource Not Found');
  }
  let updated = false;
  if (text && text !== updateItem.text) {
    updateItem.text = text;
    updated = true;
  }

  if ('done' in req.body && done !== updateItem.done) {
    updateItem.done = done;
    updated = true;
  }

  if (updated) {
    await saveTodoState(todoState);
    return res.status(200).json(updateItem);
  } else {
    return res.status(204).json();
  }
};

const getTodoState = async () => {
  try {
    const todoState: any = await fs.readFile(config.get('TODO_FILE_URL'));

    return JSON.parse(todoState);
  } catch (error) {
    if (!error.path) {
      throw new ServerError(error.message);
    }
    return {};

    // throw new ServerError(error.message);
  }
};

const saveTodoState = async (todoState: any) => {
  try {
    await fs.writeFile(config.get('TODO_FILE_URL'), JSON.stringify(todoState));
  } catch (error) {
    throw new ServerError(error.message);
  }
  const todonewState = await getTodoState();
  return todonewState;
};

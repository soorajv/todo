import express from 'express';

import { getTodo } from '../services/todo.service';

const router = express.Router();

router.get('/v1/todo', getTodo);
export { router as todoGetRouter };

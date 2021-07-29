import { Request, Response, NextFunction } from 'express';

import Joi from 'joi';

import { RequestValidationError } from '../../errors/request-validation-error';

const saveSchema = Joi.object({
  text: Joi.string()
    .max(200)
    .regex(/^\w+(?:\s+\w+)*$/)
    .required(),
  done: Joi.boolean().required(),
});
const putSchema = Joi.object({
  text: Joi.string()
    .max(200)
    .regex(/^\w+(?:\s+\w+)*$/),
  done: Joi.boolean(),
});

const pathSchema = Joi.object({
  id: Joi.string().max(100).required(),
});

export const validateTodoPostRequest = () => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const vResult = saveSchema.validate(req.body, { abortEarly: false });

    if (vResult.error) {
      throw new RequestValidationError(vResult.error);
    }
    next();
  };
};

export const validateTodoPutRequest = () => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const vPathResult = pathSchema.validate(req.params, {
      abortEarly: false,
    });
    const vBodyResult = putSchema.validate(req.body, { abortEarly: false });
    if (vPathResult.error) {
      throw new RequestValidationError(vPathResult.error);
    }
    if (vBodyResult.error) {
      throw new RequestValidationError(vBodyResult.error);
    }
    next();
  };
};

export const validateTodoDeleteRequest = () => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const vPathResult = pathSchema.validate(req.params, {
      abortEarly: false,
    });

    if (vPathResult.error) {
      throw new RequestValidationError(vPathResult.error);
    }

    next();
  };
};

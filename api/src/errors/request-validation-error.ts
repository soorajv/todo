import * as Joi from 'joi';

import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: Joi.ValidationError) {
    super('Invalid request parameters'); // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
    this.name = 'BadRequestError';
  }
  serializeErrors() {
    return this.errors.details.map((err) => {
      return { message: err.message, field: err.context?.label };
    });
  }
}

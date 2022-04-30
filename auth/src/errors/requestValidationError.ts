import {ValidationError} from 'express-validator';
import {CustomError} from './customError';

export class RequestValidationError extends CustomError {

  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Validation failed');
    
    // When in typescript and when subclassing a built-in class (Error) use the following line:
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map(error => { // map the errors to a new array. works because the errors is public in the constructor
      return {
        message: error.msg,
        field: error.param
      };
    });
  }
}
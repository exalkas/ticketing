import { ValidationError } from "express-validator";
import {CustomError} from './customError';

export class DatabaseConnectionError extends CustomError {
  
    reason = 'Error connecting to database';
    statusCode = 500;
  
    constructor(public errors: ValidationError[]) {
        super('Error connecting to database');

        // When in typescript and when subclassing a built-in class (Error) use the following line:
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [
            {message: this.reason}
        ]
    }
}
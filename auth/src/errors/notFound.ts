import { CustomError } from "./customError";

export class NotFoundError extends CustomError {
    statusCode = 404;

    constructor() {
        super('Route not Found');

        // When in typescript and when subclassing a built-in class (Error) use the following line:
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors() {
        return [
            { message: 'Path or method not Found' }
        ]
    }
}
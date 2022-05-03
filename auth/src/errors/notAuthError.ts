import { CustomError } from "./customError";

export class NotLoggedinError extends CustomError {
    statusCode = 401;

    constructor() {
        super('User is not authorized');

        // When in typescript and when subclassing a built-in class (Error) use the following line:
        Object.setPrototypeOf(this, NotLoggedinError.prototype);
    }

    serializeErrors() {
        return [
            { message: 'User is not authorized' }
        ]
    }
}
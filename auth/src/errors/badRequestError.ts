import { CustomError } from "./customError";

export class BadRequestError extends CustomError {
    statusCode = 400;

    constructor(message: string) {
        super(message);

        // When in typescript and when subclassing a built-in class (Error) use the following line:
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}
export abstract class CustomError extends Error {
    abstract statusCode: number; // When extending Error Base Class, there must be a variable named StatusCode

    constructor(message: string) {
        super(message);

        // When in typescript and when subclassing a built-in class (Error) use the following line:
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    abstract serializeErrors(): { message: string, field?: string }[]
}
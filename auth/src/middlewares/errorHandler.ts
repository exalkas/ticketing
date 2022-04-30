import {Request, Response, NextFunction} from 'express';
import { CustomError } from '../errors/customError';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    if (err instanceof CustomError) {
    
        console.log('request validation error')
        return res.status(err.statusCode).send({errors: err.serializeErrors()});
    }

    console.log("There is an ERROR:", err);
    // const status = err.statusCode || 500;
    const message = err.message;
    // const data = err.data;
    // if no known error then send a generic error
    res.status(400).send({errors: [{ message: 'Something went wrong' }]});
}
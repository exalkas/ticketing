import express, {Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import {body, validationResult} from 'express-validator';
import {RequestValidationError} from '../errors/requestValidationError';
import { BadRequestError } from '../errors/badRequestError';
import {User} from '../models/User';
import {Password} from '../services/password';

const router = express.Router();

router.post('/users/login', [
    body("email").isEmail().withMessage("Email is not valid"),
    body("pass")
      .trim()
      .notEmpty()
      .withMessage("Password cannot be empty"),
  ], async (req: Request, res: Response) => {

    // const errors = validationResult(req);

    // if (!errors.isEmpty()) { // if there are errors
        
    //     throw new RequestValidationError(errors.array());
    //     // throw new Error('Invalid email or password');
    //     // return  res.status(400).send(errors.array()); // send the errors in array format
    // }

    res.send('Hello from login route');
});

export default router
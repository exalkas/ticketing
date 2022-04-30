import express, {Request, Response} from 'express'
import {body, validationResult} from 'express-validator';
import {RequestValidationError} from '../errors/requestValidationError';
import {DatabaseConnectionError} from '../errors/databaseConnectionError';

const router = express.Router();

router.post('/users/register', [
    body("email").isEmail().withMessage("Email is not valid"),
    body("pass")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ], async (req: Request, res: Response) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) { // if there are errors
        
        throw new RequestValidationError(errors.array());
        // throw new Error('Invalid email or password');
        // return  res.status(400).send(errors.array()); // send the errors in array format
    }

    throw new DatabaseConnectionError(errors.array());

    console.log('creating a user')
    res.send('Hello from register route');
}) 

export default router
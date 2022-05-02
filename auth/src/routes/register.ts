import express, {Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import {body, validationResult} from 'express-validator';
import {RequestValidationError} from '../errors/requestValidationError';
import { BadRequestError } from '../errors/badRequestError';
import {User} from '../models/User';
import {Password} from '../services/password';

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

    Password.hashPassword('string')
    const {email, pass} = req.body;

    const existingUser = await User.findOne({email}); // check if email already exists

    if (existingUser) {
        throw new BadRequestError('User already exists');
        // return res.send({message: 'User already exists'});
    }

    let user = User.build({email, pass}); // create a new user

    await user.save()

    // generate JWT
    // the "!" means that we know that JWT_KEY is defined for sure. It's for typescript
    const userJwt = jwt.sign({id: user._id}, process.env.JWT_KEY!);

    // Store it on session object
    // so we can retrieve it from the request
    req.session = { // set it like this so no issues with typescript - don't use req.session.jwt
        jwt: userJwt
    };

    res.send(user);
}) 

export default router
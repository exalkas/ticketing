import express, {Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import {body} from 'express-validator';
import { BadRequestError } from '../errors/badRequestError';
import {User} from '../models/User';
import {Password} from '../services/password';
import validateRequest from '../middlewares/validateRequest';

const router = express.Router();

router.post('/users/login', [
    body("email").isEmail().withMessage("Email is not valid"),
    body("pass")
      .trim()
      .notEmpty()
      .withMessage("Password cannot be empty"),
  ], 
  validateRequest,
  async (req: Request, res: Response) => {

    const {email, pass} = req.body;
    
    const user = await User.findOne({email})

    if(!user || // if user email is not found or pass not match
      !(await Password.comparePasswords(user.pass, pass))
      ) throw new BadRequestError("Invalid credentials");

    // generate JWT
    const userJwt = jwt.sign({id: user._id}, process.env.JWT_KEY!);

    // Store it on session object
    // so we can retrieve it from the request
    req.session = { // set it like this so no issues with typescript - don't use req.session.jwt
        jwt: userJwt
    };

    res.status(200).send(user);
});

export default router
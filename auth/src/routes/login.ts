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
    
    const userEmail = User.findOne({email})

    if(!userEmail) throw new BadRequestError("Invalid credentials")

    if (!(await Password.comparePasswords(userEmail.pass, pass))) throw new BadRequestError("Invalid credentials")
    
    res.send('Hello from login route');
});

export default router
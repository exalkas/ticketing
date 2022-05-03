import {Request, Response, NextFunction} from 'express';
import { NotLoggedinError } from '../errors/notAuthError';

export default function requireAuth(req: Request, res: Response, next: NextFunction) {
    
    if (!req.user) throw new NotLoggedinError()

    next();
}
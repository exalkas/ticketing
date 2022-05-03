/**
 * If user has a valid JWt then add to req object the user property with his id
 * otherwise do nothing
 * just call next
 */
import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string;
}

/**
 * How to add a property to an existing object (req object in this case)
 */
declare global {
    namespace Express { // inside Express
        interface Request { // find interface Request
            user?: UserPayload; // add a property to it
        }
    }
}

export default function auth(req: Request, res: Response, next: NextFunction) {

    if (!req.session || !req.session.jwt) {
        return next()
    }

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;

        req.user = payload;
        console.log('payload is', payload)
        
        // req.se
    } catch (error:any) {
        console.log('Error in auth middleware:', error.message)
    }

    next()
}

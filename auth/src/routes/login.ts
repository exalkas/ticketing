import {Request, Response} from 'express'

exports.login = (req: Request, res: Response) => {
    res.send('Hello from login route');
};
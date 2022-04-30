import {Request, Response} from 'express'

exports.current = (req: Request, res: Response) => {
    res.send('Hello from current route');
};
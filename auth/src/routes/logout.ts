import {Request, Response} from 'express'

exports.logout = (req: Request, res: Response) => {
    res.send('Hello from logout route');
};
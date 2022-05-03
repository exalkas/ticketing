import express, {Request, Response} from 'express'

const router = express.Router();

router.post('/users/logout', (req: Request, res: Response) => {
    
    req.session = null;

    res.send('Hello from logout route');
});

export default router;
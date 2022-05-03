/**
 * Sends back the user object to the client showing wether he is logged in or not
 */
import express, {Request, Response} from 'express'
import auth from '../middlewares/authMiddleware'

const router = express.Router();

router.get('/users/auth', auth, async (req: Request, res: Response) => {

    res.send({user: req.user || null}); // the '|| null' is because req.user is undefined if not logged in
    
})

export default router
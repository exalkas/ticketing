/**
 * Refacttored to use with testing.
 * This module is for configuring the express app.
 */

import express from 'express'
import 'express-async-errors'; // import this to don't get promises in custom errors with async functions
import {} from 'dotenv/config';
import cookieSession from 'cookie-session';

import register from './routes/register'
import login from './routes/login'
import auth from './routes/authRoute'
import logout from './routes/logout'
import { errorHandler } from './middlewares/errorHandler';
import { NotFoundError } from './errors/notFound';

const app = express();
app.set('trust proxy', true);

app.use(express.json())
app.use(cookieSession({
    signed: false, // don't need to sign the cookie
    secure: true // only send cookie over https
})
);

app.use(register)
app.use(login)
app.use(logout)
app.use(auth)

app.all('*', async (req, res, next) => {throw new NotFoundError()}) // handle all not found routes
app.use(errorHandler)

export default app;
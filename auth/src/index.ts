import express from 'express'
import 'express-async-errors'; // import this to don't get promises in custom errors with async functions
import {} from 'dotenv/config';
import mongoose from 'mongoose'
import cookieSession from 'cookie-session';

import register from './routes/register'
import login from './routes/register'
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
// app.use(logout)
// app.use(currentuser)

app.all('*', async (req, res, next) => {throw new NotFoundError()}) // handle all not found routes
app.use(errorHandler)

const startDB = async () => {

    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }
    // if (!process.env.MONGO_URI) {
    //     throw new Error('DB CONNECTION_STRING must be defined');
    // }

    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
        console.log('Auth service, connected to DB')
    } catch (error) {
        console.log('Error connecting to DB:', error)
    }
}

startDB()

app.listen(5000, () => {

    console.log('Auth server is up and listens at port!!!', 5000)

})
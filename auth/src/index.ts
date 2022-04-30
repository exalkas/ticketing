import express from 'express'
import 'express-async-errors'; // import this to don't get promises in custom errors with async functions
import {} from 'dotenv/config';
import mongoose from 'mongoose'

import register from './routes/register'
import { errorHandler } from './middlewares/errorHandler';
import { NotFoundError } from './errors/notFound';

const app = express();

app.use(express.json())

app.use(register)

app.all('*', async (req, res, next) => {throw new NotFoundError()}) // handle all not found routes
app.use(errorHandler)

const startDB = async () => {

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
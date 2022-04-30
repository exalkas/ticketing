import express from 'express'
import 'express-async-errors';
import {} from 'dotenv/config';

import register from './routes/register'
import { errorHandler } from './middlewares/errorHandler';
import { NotFoundError } from './errors/notFound';

const app = express();

app.use(express.json())

app.use(register)

app.all('*', async (req, res, next) => {throw new NotFoundError()}) // handle all not found routes
app.use(errorHandler)

app.listen(5000, () => {

    console.log('v2 running')
    console.log('Auth server is up and listens at port!!!', 5000)

})
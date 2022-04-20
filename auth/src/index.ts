import express from 'express'
import {json} from 'body-parser';
import {} from 'dotenv/config';

const app = express();

app.use(json())

app.get('/', (req, res) => {
    console.log('Welcome')

    res.send('hello from /')
})

app.listen(5000, () => console.log('Auth server is up and listens at port', 5000))

/**
 * Steps to setup kubernettes
 * 1. setup docker by adding the file Dockerfile
 * 2. Add a .dockerifnore with a "node_modules" 
 * create an image file
 */
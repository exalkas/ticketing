import express from 'express'
import {json} from 'body-parser';
import {} from 'dotenv/config';
import axios from 'axios';

const app = express();

app.use(json())

app.get('/', async (req, res) => {
    console.log('Welcome')

    const response = await axios.get('http://event-bus-srv:5005')

    console.log('this is the response form auth server:', response)
    res.send('hello from /')
})

app.listen(5000, () => {

    console.log('v2 running')
    console.log('Auth server is up and listens at port!!!', 5000)

})

/**
 * Steps to setup kubernettes
 * 1. setup docker by adding the file Dockerfile
 * 2. Add a .dockerifnore with a "node_modules" 
 * create an image file
 */
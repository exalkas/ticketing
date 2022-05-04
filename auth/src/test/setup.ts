import request from 'supertest'
import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../app';

declare global {

    var register: () => Promise<string[]> // function login returns a promise with an array of strings
}

// store instance of mongo server to make it available to all tests
let mongod: any;

// run the following before all tests
beforeAll(async () => {

    // make the env variables available to the tests
    process.env.JWT_KEY = 'asdf1234';

    // create new instance of mongo server
    mongod = new MongoMemoryServer();

    const mongoUri = await mongod.getUri();

    await mongoose.connect(mongoUri)
});

beforeEach( async () =>{
    // get all collections
    const collections = await mongoose.connection.db.collections();

    // loop through all collections and drop them
    collections.forEach(async collection => {
        await collection.deleteMany({});
    });
})

// stop mongo server and close connection after all tests

afterAll(async () => {
    await mongod.stop();
    await mongoose.connection.close();
});

// Helper function 

global.register = async () => {

    const email = '123@email.com'
    const pass = '1234'

    const response = await request(app)
    .post('/users/register')
    .send({
        email,
        pass
    })
    .expect(201); // we expect to get a 400 status code

    const cookie = response.get('Set-Cookie');

    cookie.push(response.body.id)
    return cookie;
}
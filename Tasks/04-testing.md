# Testing Microservices with TS

- install the following: `npm i --save-dev @types/jest @types/supertest jest ts-jest supertest mongodb-memory-server`
- take care of the versions. maybe you need to use `npm i --force`
- N.B. version of `mongodb-memory-server`. Current code works with version 6.x. Maybe you will need to downgrade
- create a folder named `test` inside `src`
- add a `setup.ts` file
- add the following code:

```
import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../app';

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

```

- if not already, separate `app.ts` from `index.ts`
- create folder `__test__` inside `routes` folder
- add a file named `register.test.ts`
- add the following code inside it:

```
import request from 'supertest'; // to make requests to the express server
import app from '../../app';

it('testing register route, get a 201 after successful registration', async () => {
    return await request(app)
        .post('/users/register')
        .send({
            email: 'some@email.com',
            pass: '1234'
        })
        .expect(201); // we expect to get a 201 status code
})
```

- go to the project folder and execute `npm run test`
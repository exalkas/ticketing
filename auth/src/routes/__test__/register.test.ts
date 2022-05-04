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

it('testing with invalid email, get a 400', async () => {

    return await request(app)
        .post('/users/register')
        .send({
            email: 'someemail.com',
            pass: '1234'
        })
        .expect(400); // we expect to get a 400 status code
})

it('testing with invalid pass, get a 400', async () => {

    return await request(app)
        .post('/users/register')
        .send({
            email: 'some@email.com',
            pass: '123'
        })
        .expect(400); // we expect to get a 400 status code
})

it('testing with missing email and pass, get a 400', async () => {

    await request(app)
        .post('/users/register')
        .send({
            email: 'some@email.com'
        })
        .expect(400); // we expect to get a 400 status code
    return await request(app)
        .post('/users/register')
        .send({
        })
        .expect(400); // we expect to get a 400 status code
})

it('testing with duplicate emails, get a 400', async () => {

    await request(app)
        .post('/users/register')
        .send({
            email: 'some@email.com',
            pass: '1234'
        })
        .expect(201); // first registration should be ok
    return await request(app)
        .post('/users/register')
        .send({
            email: 'some@email.com',
            pass: '1234'
        })
        .expect(400); // should get error 400
})

it('send a cookie after successful registration', async () => {

    const response = await request(app)
        .post('/users/register')
        .send({
            email: '123@ameil.com',
            pass: '1234'
        })
        .expect(201); // we expect to get a 201 status code

        expect(response.get('Set-Cookie')).toBeDefined(); // we expect to get a cookie

})
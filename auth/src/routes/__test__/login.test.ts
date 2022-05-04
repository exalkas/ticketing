import request from 'supertest'
import app from '../../app';

// test with empty pass
// test with not registered email
// test with wrong pass
// test with correct credentials

it('test with empty pass', async () => {

    await request(app)
    .post('/users/login')
    .send({
        email: '123@amail.com',
    })
    .expect(400); // we expect to get a 400 status code
})

it('test with unregistered user', async () => {

    await request(app)
    .post('/users/login')
    .send({
        email: '123@amail.com',
        pass: '1234'
    })
    .expect(400); // we expect to get a 400 status code
})

it('test with wrong pass', async () => {

    await request(app)
    .post('/users/register')
    .send({
        email: '123@email.com',
        pass: '1234'
    })
    .expect(201); // we expect to get a 400 status code

    await request(app)
    .post('/users/login')
    .send({
        email: '123@email.com',
        pass: '123'
    })
    .expect(400); // we expect to get a 400 status code

})

it('test with correct credentials', async () => {

    await request(app)
    .post('/users/register')
    .send({
        email: '123@email.com',
        pass: '1234'
    })
    .expect(201); // we expect to get a 400 status code

    const response = await request(app)
    .post('/users/login')
    .send({
        email: '123@email.com',
        pass: '1234'
    })
    .expect(200); // we expect to get a 400 status code

    expect(response.get('Set-Cookie')).toBeDefined(); // we expect to get a cookie

})
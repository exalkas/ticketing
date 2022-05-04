import request from 'supertest'
import app from '../../app';

// test clearing cookie

it('clear cookie after signing out', async () => {

    await request(app)
    .post('/users/register')
    .send({
        email: '123@email.com',
        pass: '1234'
    })
    .expect(201); // we expect to get a 201 status code

    const response = await request(app)
    .post('/users/login')
    .send({
        email: '123@email.com',
        pass: '1234'
    })
    .expect(200); // we expect to get a 200 status code

    expect(response.get('Set-Cookie')).toBeDefined();

    const logoutResponse = await request(app)
    .post('/users/logout')
    .expect(200); // we expect to get a 200 status code

    expect(logoutResponse.get('Set-Cookie')).toBeDefined(); // we expect to get a cookie
    // could also expect the following:
    // expect(logoutResponse.get('Set-Cookie'))[0].toEqual('express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly');
})
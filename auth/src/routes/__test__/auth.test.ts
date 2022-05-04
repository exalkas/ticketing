import request from "supertest";
import app from "../../app";

it('test login and get current user', async () => {
    
    // const response = await request(app)
    // .post('/users/register')
    // .send({
    //     email: '123@email.com',
    //     pass: '1234'
    // })
    // .expect(201); // we expect to get a 400 status code
    

    // cookie doesn't continue to come back along with the 2nd request
    // so user is null
    // store cookie from response into a variable
    // const cookie = response.get('Set-Cookie');
    const cookie = await register();

    console.log('Auth test: cookie: ', cookie);

    const logoutResponse = await request(app)
    .get('/users/auth')
    .set('Cookie', cookie)
    .expect(200)

    console.log('from logout test: ', logoutResponse.body)

    expect(logoutResponse.body.user.id).toEqual(cookie[1]);

})

it('test with non authed user', async () => {

    const response = await request(app)
    .get('/users/auth')
    .expect(200)

    expect(response.body.user).toEqual(null);
})
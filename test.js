const request = require('supertest');
const app = require('../app');

test('User registration', async () => {
    const res = await request(app).post('/register').send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpass'
    });
    expect(res.statusCode).toBe(201);
});

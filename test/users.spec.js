import request from 'supertest';
import { httpServer } from '../src';

afterAll(async () => {
  await httpServer.close();
});

// Интеграционные тесты
// Весь проект из себя представляет один контроллер, поэтому эти тесты я бы лучше назвал e2e
describe('Routes', () => {
  describe('PUT /users', () => {
    const test = {};

    beforeAll(async () => {
      test.response = await request(httpServer)
        .put('/users')
        .send({
          users: [{
            nickname: 'SomeUser1',
            email: 'SomeUser1@email.com',
          }, {
            nickname: 'SomeUser2',
            email: 'SomeUser2@email.com',
          }],
        });
    });

    it('should return status equal 200', () => {
      expect(test.response.status).toEqual(200);
    });
  });
});

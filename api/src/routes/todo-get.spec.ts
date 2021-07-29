import request from 'supertest';
import { app } from '../app';
it('returns a 200 todo get', async () => {
  return request(app)
    .get('/v1/todo')

    .expect(200);
});

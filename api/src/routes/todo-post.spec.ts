import request from 'supertest';
import { promises as fs } from 'fs';

import { app } from '../app';

it('returns a 201 on successful todo post', async () => {
  jest.spyOn(fs, 'writeFile').mockResolvedValue();
  return request(app)
    .post('/v1/todo')
    .send({
      text: 'test',
      done: true,
    })
    .expect(201);
});

it('returns a 400 with an invalid body', async () => {
  return request(app)
    .post('/v1/todo')
    .send({
      text: 'First ',
    })
    .expect(400);
});

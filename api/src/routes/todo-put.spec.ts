import request from 'supertest';
import { app } from '../app';

import { promises as fs } from 'fs';

it('todo put returns a 404 if resource not found', async () => {
  jest.spyOn(fs, 'writeFile').mockResolvedValue();
  return request(app)
    .put('/v1/todo/58f3aeef-0647-4df0-bad1-c1edd5a4915a')
    .send({
      text: 'test',
    })
    .expect(404);
});

it('todo put returns a 200 if resource  found', async () => {
  const fileData = {
    'baec99c7-21f5-47aa-9625-a631c9936fb9': {
      id: 'baec99c7-21f5-47aa-9625-a631c9936fb9',
      text: 'First Board',
      done: false,
    },
  };
  jest.spyOn(fs, 'writeFile').mockResolvedValue();
  jest.spyOn(fs, 'readFile').mockResolvedValue(JSON.stringify(fileData));
  return request(app)
    .put('/v1/todo/baec99c7-21f5-47aa-9625-a631c9936fb9')
    .send({
      text: 'test',
    })
    .expect(200);
});
it('returns a 204 on successful todo put but no content', async () => {
  const fileData = {
    'baec99c7-21f5-47aa-9625-a631c9936fb9': {
      id: 'baec99c7-21f5-47aa-9625-a631c9936fb9',
      text: 'First Board',
      done: false,
    },
  };
  jest.spyOn(fs, 'writeFile').mockResolvedValue();
  jest.spyOn(fs, 'readFile').mockResolvedValue(JSON.stringify(fileData));
  return request(app)
    .put('/v1/todo/baec99c7-21f5-47aa-9625-a631c9936fb9')
    .send({
      text: 'First Board',
    })
    .expect(204);
});

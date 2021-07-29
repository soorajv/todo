import request from 'supertest';
import { promises as fs } from 'fs';

import { app } from '../app';

it('todo delete returns a 404 if resource not found', async () => {
  jest.spyOn(fs, 'readFile').mockResolvedValue(JSON.stringify({}));
  return request(app)
    .delete('/v1/todo/58f3aeef-0647-4df0-bad1-c1edd5a4915a')

    .expect(404);
});

it('todo delete returns a 204 if resource  found', async () => {
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
    .delete('/v1/todo/baec99c7-21f5-47aa-9625-a631c9936fb9')

    .expect(204);
});

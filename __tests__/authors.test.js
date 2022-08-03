const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
// const Author = require('../lib/models/Author');

describe('authors routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET - /authors should return a list of authors with their dob and pob', async () => {
    const res = await request(app).get('/authors');
    expect(res.body.length).toEqual(8);
  });
});

const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('books routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET - should return a list of books with release dates', async () => {
    const res = await request(app).get('/books');
    expect(res.body.length).toEqual(8);
  });
  
  it('GET - should return single book with details', async () => {
    const res = await request(app).get('/books/1');
    expect(res.body).toEqual({
      id: '1',
      title: 'All the Light We Cannot See',
      released: 2014,
    });
  });

  afterAll(() => {
    pool.end();
  });
});

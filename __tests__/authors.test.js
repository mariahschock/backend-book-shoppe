const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Author = require('../lib/models/Author');

describe('authors routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET - /authors should return a list of authors with their dob and pob', async () => {
    const res = await request(app).get('/authors');
    expect(res.body.length).toEqual(6);
  });

  it('GET - /authors/id should return single author with details', async () => {
    const res = await request(app).get('/authors/1');
    expect(res.body).toEqual({
      id: '1',
      author_name: 'Anthony Doerr',
      dob: '1973-10-27T07:00:00.000Z',
      pob: 'Cleveland, Ohio',
    });
  });

  it('POST - should add new author', async () => {
    const author = new Author({
      author_name: 'Dan Brown',
      dob: '1964-06-22',
      pob: 'Exeter, New Hampshire', 
    });
    const res = await request(app).post('/authors').send(author);
    expect(res.body.author_name).toEqual(author.author_name);
    expect(res.body).toHaveProperty('dob');
    expect(res.body.pob).toEqual(author.pob);
  });

  afterAll(() => {
    pool.end();
  });
});

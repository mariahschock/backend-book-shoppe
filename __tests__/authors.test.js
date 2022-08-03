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
    expect(res.body).toHaveProperty('id', '1');
    expect(res.body).toHaveProperty('author_name', 'Anthony Doerr');
    expect(res.body).toHaveProperty('dob');
    expect(res.body).toHaveProperty('pob');
    expect(res.body).toHaveProperty('books');
    expect(res.body.books[0]).toHaveProperty('id');
    expect(res.body.books[0]).toHaveProperty('title');
    expect(res.body.books[0]).toHaveProperty('released');
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

const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Book = require('../lib/models/Book');

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
    expect(res.body).toHaveProperty('id', '1');
    expect(res.body).toHaveProperty('title', 'All the Light We Cannot See');
    expect(res.body).toHaveProperty('released', 2014);
    expect(res.body).toHaveProperty('authors');
    expect(res.body.authors[0]).toHaveProperty('dob');
    expect(res.body.authors[0]).toHaveProperty('pob');
    expect(res.body.authors[0]).toHaveProperty('id');
    expect(res.body.authors[0]).toHaveProperty('author_name');
  });

  it('POST - should add new book', async () => {
    const book = new Book({
      title: 'The Da Vinci Code',
      released: 2003,
    });
    const res = await request(app).post('/books').send(book);
    expect(res.body.title).toEqual(book.title);
    expect(res.body.released).toEqual(book.released);
  });

  afterAll(() => {
    pool.end();
  });
});

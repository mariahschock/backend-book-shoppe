const pool = require('../utils/pool');

class Author {
  id;
  author_name;
  dob;
  pob;
  books;

  constructor(row) {
    this.id = row.id;
    this.author_name = row.author_name;
    this.dob = row.dob;
    this.pob = row.pob;
    this.books = row.books || [];
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * from authors;'
    );
    return rows.map((row) => new Author(row));
  }

  static async getAuthorById(id) {
    const { rows } = await pool.query(
      `SELECT authors.*,
      coalesce(
        json_agg(to_jsonb(books))
        FILTER (where books.id is not null), '[]') as books from authors
        LEFT JOIN books_authors on books_authors.author_id = authors.id
        LEFT JOIN books on books_authors.book_id = books.id
        WHERE authors.id = $1
        GROUP BY authors.id;`, [id]
    );
    return new Author(rows[0]);
  }
  
  static async addAuthor(author) {
    const { rows } = await pool.query(
      'INSERT INTO authors (author_name, dob, pob) VALUES ($1, $2, $3) returning *;',
      [author.author_name, author.dob, author.pob]);
    return new Author(rows[0]);
  }
}

module.exports = Author;

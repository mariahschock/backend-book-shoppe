const pool = require('../utils/pool');

class Book {
  id;
  title;
  released;
  authors;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
    this.authors = row.authors || [];
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * from books;'
    );
    return rows.map((row) => new Book(row));
  }

  static async getBookById(id) {
    const { rows } = await pool.query(
      `SELECT books.*,
      coalesce(
        json_agg(to_jsonb(authors))
        FILTER (where authors.id is not null), '[]') as authors from books
        LEFT JOIN books_authors on books_authors.book_id = books.id
        LEFT JOIN authors on books_authors.author_id = authors.id
        WHERE books.id = $1
        GROUP BY books.id;`, [id]
    );
    return new Book(rows[0]);
  }

  static async addBook(book) {
    const { rows } = await pool.query(
      'INSERT INTO books (title, released) VALUES ($1, $2) returning *;',
      [book.title, book.released]);
    return new Book(rows[0]);
  }
}

module.exports = Book;

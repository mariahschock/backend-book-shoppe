const pool = require('../utils/pool');

class Book {
  id;
  title;
  released;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * from books;'
    );
    return rows.map((row) => new Book(row));
  }

  static async getBookById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM books WHERE id=$1;', [id]
    );
    if (!rows[0]) return null;
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

const pool = require('../utils/pool');

class Author {
  id;
  author_name;
  dob;
  pob;

  constructor(row) {
    this.id = row.id;
    this.author_name = row.author_name;
    this.dob = row.dob;
    this.pob = row.pob;
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * from authors;'
    );
    return rows.map((row) => new Author(row));
  }

  static async getAuthorById(id) {
    const { rows } = await pool.query(
      'SELECT * from authors WHERE id=$1;', [id]
    );
    if (!rows[0]) return null;
    return new Author(rows[0]);
  }
}

module.exports = Author;

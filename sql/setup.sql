-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS authors CASCADE;
DROP TABLE IF EXISTS books_authors CASCADE;

CREATE TABLE books (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR NOT NULL,
  released INT NOT NULL
);

CREATE TABLE authors (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  author_name VARCHAR NOT NULL,
  dob DATE,
  pob VARCHAR NOT NULL
);

CREATE TABLE books_authors (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  book_id INT,
  author_id INT,
  foreign key (book_id) REFERENCES books(id),
  foreign key (author_id) REFERENCES authors(id)
);

INSERT INTO books (
  title,
  released
)
VALUES
  ('All the Light We Cannot See', 2014),
  ('Cloud Cuckoo Land', 2021),
  ('The Invisible Life of Addie LaRue', 2020),
  ('The Art of Racing in the Rain', 2008),
  ('The Secret Histroy', 1992),
  ('The Goldfinch', 2013),
  ('The Great Gatsby', 1925),
  ('East of Eden', 1952);

  INSERT INTO authors (
  author_name,
  dob,
  pob
)
VALUES
  ('Anthony Doerr', '1973-10-27', 'Cleveland, Ohio'),
  ('V. E. Schwab', '1987-07-07', 'California'),
  ('Garth Stein', '1964-12-06', 'Los Angeles, California'),
  ('Donna Tartt', '1963-12-23', 'Greenwood, Mississippi'),
  ('F. Scott Fitzgerald', '1896-09-24', 'Saint Paul, Minnesota'),
  ('John Steinbeck', '1902-02-27', 'Salinas, California');

INSERT INTO books_authors (
  author_id,
  book_id
)
VALUES
  ('1', '1'),
  ('1', '2'),
  ('2', '3'),
  ('3', '4'),
  ('4', '5'),
  ('4', '6'),
  ('5', '7'),
  ('6', '8');

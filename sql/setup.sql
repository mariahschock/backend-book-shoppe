-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS books;

CREATE TABLE books (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  title VARCHAR NOT NULL,
  released INT NOT NULL
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


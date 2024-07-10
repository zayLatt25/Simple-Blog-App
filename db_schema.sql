
-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS readers (
    reader_id INTEGER PRIMARY KEY AUTOINCREMENT,
    reader_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS writers (
    writer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    writer_name TEXT NOT NULL
);

-- CREATE TABLE IF NOT EXISTS email_accounts (
--     email_account_id INTEGER PRIMARY KEY AUTOINCREMENT,
--     email_address TEXT NOT NULL,
--     reader_id  INT, --the user that the email account belongs to
--     FOREIGN KEY (writer_id) REFERENCES users(writer_id)
-- );

CREATE TABLE IF NOT EXISTS articles (
    article_id INTEGER PRIMARY KEY AUTOINCREMENT,
    article_title TEXT NOT NULL,
    article_content TEXT NOT NULL,
    writer_id INT, 
    FOREIGN KEY (writer_id) REFERENCES writers(writer_id)
);

-- Set up three users
INSERT INTO readers ('reader_name') VALUES ('Simon Star');
INSERT INTO readers ('reader_name') VALUES ('Dianne Dean');

INSERT INTO writers ('writer_name') VALUES ('Starry Traveler');
INSERT INTO writers ('writer_name') VALUES ('Quantum Quill');

-- INSERT INTO email_accounts ('email_address', 'writer_id') VALUES ('simon@gmail.com', 1); 
-- INSERT INTO email_accounts ('email_address', 'writer_id') VALUES ('simon@hotmail.com', 1); 
-- INSERT INTO email_accounts ('email_address', 'writer_id') VALUES ('dianne@yahoo.co.uk', 2); 

INSERT INTO articles ('article_title', 'article_content', 'writer_id') VALUES ('My first article', 'This is the content of my first article', 1); 
INSERT INTO articles ('article_title', 'article_content', 'writer_id') VALUES ('My second article', 'I am writing an article for the second time', 1); 

COMMIT;


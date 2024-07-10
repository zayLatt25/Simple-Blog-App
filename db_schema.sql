
-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS readers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS writers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

-- CREATE TABLE IF NOT EXISTS email_accounts (
--     email_account_id INTEGER PRIMARY KEY AUTOINCREMENT,
--     email_address TEXT NOT NULL,
--     reader_id  INT, --the user that the email account belongs to
--     FOREIGN KEY (writer_id) REFERENCES users(writer_id)
-- );

CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    writer_id INT, 
    FOREIGN KEY (writer_id) REFERENCES writers(id)
);

-- Set up three users
INSERT INTO readers ('name') VALUES ('Simon Star');
INSERT INTO readers ('name') VALUES ('Dianne Dean');

INSERT INTO writers ('name') VALUES ('Starry Traveler');
INSERT INTO writers ('name') VALUES ('Quantum Quill');

-- INSERT INTO email_accounts ('email_address', 'writer_id') VALUES ('simon@gmail.com', 1); 
-- INSERT INTO email_accounts ('email_address', 'writer_id') VALUES ('simon@hotmail.com', 1); 
-- INSERT INTO email_accounts ('email_address', 'writer_id') VALUES ('dianne@yahoo.co.uk', 2); 

INSERT INTO articles ('title', 'content', 'writer_id') VALUES ('My first article', 'This is the content of my first article', 1); 
INSERT INTO articles ('title', 'content', 'writer_id') VALUES ('My second article', 'I am writing an article for the second time', 1); 

COMMIT;


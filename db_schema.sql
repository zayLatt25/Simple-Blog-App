
-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

-- CREATE TABLE IF NOT EXISTS email_accounts (
--     email_account_id INTEGER PRIMARY KEY AUTOINCREMENT,
--     email_address TEXT NOT NULL,
--     reader_id  INT, --the user that the email account belongs to
--     FOREIGN KEY (writer_id) REFERENCES users(writer_id)
-- );

CREATE TABLE IF NOT EXISTS readers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS writers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    blogTitle TEXT NOT NULL,
    blogSubtitle TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    writerID INT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (writerID) REFERENCES writers(id)
);

-- Create a trigger to update the updatedAt column on update
-- CREATE TRIGGER update_articles_updatedAt
-- AFTER UPDATE ON articles
-- FOR EACH ROW
-- BEGIN
--     UPDATE articles SET updatedAt = CURRENT_TIMESTAMP WHERE id = OLD.id;
-- END;

-- Set up three users
INSERT INTO readers ('name') VALUES ('Simon Star');
INSERT INTO readers ('name') VALUES ('Dianne Dean');

INSERT INTO writers ('name', 'blogTitle', 'blogSubtitle') VALUES ('Starry Traveler', 'Traveling the world', 'One country at a time');
INSERT INTO writers ('name','blogTitle', 'blogSubtitle') VALUES ('Quantum Quill', 'Writing about the universe', 'One article at a time');

-- INSERT INTO email_accounts ('email_address', 'writer_id') VALUES ('simon@gmail.com', 1); 
-- INSERT INTO email_accounts ('email_address', 'writer_id') VALUES ('simon@hotmail.com', 1); 
-- INSERT INTO email_accounts ('email_address', 'writer_id') VALUES ('dianne@yahoo.co.uk', 2); 

INSERT INTO articles ('title', 'content', 'writerID') VALUES ('My first article', 'This is the content of my first article', 1); 
INSERT INTO articles ('title', 'content', 'writerID') VALUES ('My second article', 'I am writing an article for the second time', 1); 
INSERT INTO articles ('title', 'content', 'writerID') VALUES ('My third article', 'Okay this is the third time', 1); 
INSERT INTO articles ('title', 'content', 'writerID') VALUES ('I am a new writer', 'New writer first time', 2); 
INSERT INTO articles ('title', 'content', 'writerID') VALUES ('This is defo different', 'Yeaa new second time', 2); 

COMMIT;


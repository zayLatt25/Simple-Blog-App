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

CREATE TABLE IF NOT EXISTS authors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    blogTitle TEXT NOT NULL,
    blogSubtitle TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    authorID INT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (authorID) REFERENCES authors(id)
);

INSERT INTO readers ('name') VALUES ('Simon Star');
INSERT INTO readers ('name') VALUES ('Dianne Dean');

INSERT INTO authors ('name', 'blogTitle', 'blogSubtitle') VALUES ('Starry Traveler', 'Traveling the world', 'One country at a time');
INSERT INTO authors ('name','blogTitle', 'blogSubtitle') VALUES ('Quantum Quill', 'Writing about the universe', 'One article at a time');

-- INSERT INTO email_accounts ('email_address', 'writer_id') VALUES ('simon@gmail.com', 1); 
-- INSERT INTO email_accounts ('email_address', 'writer_id') VALUES ('simon@hotmail.com', 1); 
-- INSERT INTO email_accounts ('email_address', 'writer_id') VALUES ('dianne@yahoo.co.uk', 2); 

INSERT INTO articles ('title', 'content', 'authorID') VALUES ('My first article', 'In the heart of the bustling city, nestled between towering skyscrapers and the constant hum of traffic, lay a small, serene park that often went unnoticed by the hurried passersby. This park, a verdant oasis amidst the concrete jungle, was a sanctuary for those who sought a moment of peace and solitude. The air here was different; it carried the sweet scent of blooming flowers and the fresh aroma of dew-kissed grass. As the morning sun began to rise, casting a golden hue across the landscape, the park came to life with the gentle chirping of birds and the soft rustling of leaves in the breeze. At one corner of the park stood an ancient oak tree, its gnarled branches stretching out like protective arms over a weathered wooden bench. This bench had seen countless stories unfold, from the elderly couple who visited every afternoon to relive their memories, to the young artist who found inspiration in the tranquility of the surroundings. Nearby, a small pond shimmered under the sunlight, its surface occasionally disturbed by the playful antics of ducks and the gentle splash of fish breaking the water. The pond’s edge was adorned with a variety of flowers, their vibrant colors reflecting in the clear water and creating a picturesque scene.
In the center of the park, a winding path, lined with benches and lampposts, invited visitors to take a leisurely stroll. The path meandered through well-tended gardens, where the meticulous work of gardeners was evident in the perfectly trimmed hedges and the harmonious arrangement of plants. Each section of the garden seemed to tell a story of its own, with flowers of different seasons blooming in unison, creating a tapestry of colors and fragrances.
As the day progressed, the park became a haven for people from all walks of life. Joggers, clad in bright athletic wear, ran along the path, their rhythmic footsteps blending with the natural sounds. Parents with young children in tow found solace in the play area, where laughter and joyous shouts filled the air. Office workers on their lunch breaks sought refuge from their hectic schedules, sitting on the benches and enjoying a moment of quiet reflection.
As evening approached, the park transformed once again. The setting sun painted the sky with shades of orange and pink, casting long shadows and creating a magical ambiance. Street musicians often chose this time to perform, their melodies adding to the park’s charm. Couples walked hand in hand, savoring the romance of the twilight hour. The park, with its timeless beauty and serene atmosphere, offered a respite from the chaos of the city, a place where one could reconnect with nature and find inner peace.', 1); 

INSERT INTO articles ('title', 'content', 'authorID') VALUES ('My second article', 'In the heart of the bustling city, nestled between towering skyscrapers and the constant hum of traffic, lay a small, serene park that often went unnoticed by the hurried passersby. This park, a verdant oasis amidst the concrete jungle, was a sanctuary for those who sought a moment of peace and solitude. The air here was different; it carried the sweet scent of blooming flowers and the fresh aroma of dew-kissed grass. As the morning sun began to rise, casting a golden hue across the landscape, the park came to life with the gentle chirping of birds and the soft rustling of leaves in the breeze.
At one corner of the park stood an ancient oak tree, its gnarled branches stretching out like protective arms over a weathered wooden bench. This bench had seen countless stories unfold, from the elderly couple who visited every afternoon to relive their memories, to the young artist who found inspiration in the tranquility of the surroundings. Nearby, a small pond shimmered under the sunlight, its surface occasionally disturbed by the playful antics of ducks and the gentle splash of fish breaking the water. The pond’s edge was adorned with a variety of flowers, their vibrant colors reflecting in the clear water and creating a picturesque scene.
In the center of the park, a winding path, lined with benches and lampposts, invited visitors to take a leisurely stroll. The path meandered through well-tended gardens, where the meticulous work of gardeners was evident in the perfectly trimmed hedges and the harmonious arrangement of plants. Each section of the garden seemed to tell a story of its own, with flowers of different seasons blooming in unison, creating a tapestry of colors and fragrances.
As the day progressed, the park became a haven for people from all walks of life. Joggers, clad in bright athletic wear, ran along the path, their rhythmic footsteps blending with the natural sounds. Parents with young children in tow found solace in the play area, where laughter and joyous shouts filled the air. Office workers on their lunch breaks sought refuge from their hectic schedules, sitting on the benches and enjoying a moment of quiet reflection.
As evening approached, the park transformed once again. The setting sun painted the sky with shades of orange and pink, casting long shadows and creating a magical ambiance. Street musicians often chose this time to perform, their melodies adding to the park’s charm. Couples walked hand in hand, savoring the romance of the twilight hour. The park, with its timeless beauty and serene atmosphere, offered a respite from the chaos of the city, a place where one could reconnect with nature and find inner peace.', 1); 

INSERT INTO articles ('title', 'content', 'authorID') VALUES ('My third article', 'In the heart of the bustling city, nestled between towering skyscrapers and the constant hum of traffic, lay a small, serene park that often went unnoticed by the hurried passersby. This park, a verdant oasis amidst the concrete jungle, was a sanctuary for those who sought a moment of peace and solitude. The air here was different; it carried the sweet scent of blooming flowers and the fresh aroma of dew-kissed grass. As the morning sun began to rise, casting a golden hue across the landscape, the park came to life with the gentle chirping of birds and the soft rustling of leaves in the breeze.
At one corner of the park stood an ancient oak tree, its gnarled branches stretching out like protective arms over a weathered wooden bench. This bench had seen countless stories unfold, from the elderly couple who visited every afternoon to relive their memories, to the young artist who found inspiration in the tranquility of the surroundings. Nearby, a small pond shimmered under the sunlight, its surface occasionally disturbed by the playful antics of ducks and the gentle splash of fish breaking the water. The pond’s edge was adorned with a variety of flowers, their vibrant colors reflecting in the clear water and creating a picturesque scene.
In the center of the park, a winding path, lined with benches and lampposts, invited visitors to take a leisurely stroll. The path meandered through well-tended gardens, where the meticulous work of gardeners was evident in the perfectly trimmed hedges and the harmonious arrangement of plants. Each section of the garden seemed to tell a story of its own, with flowers of different seasons blooming in unison, creating a tapestry of colors and fragrances.
As the day progressed, the park became a haven for people from all walks of life. Joggers, clad in bright athletic wear, ran along the path, their rhythmic footsteps blending with the natural sounds. Parents with young children in tow found solace in the play area, where laughter and joyous shouts filled the air. Office workers on their lunch breaks sought refuge from their hectic schedules, sitting on the benches and enjoying a moment of quiet reflection.
As evening approached, the park transformed once again. The setting sun painted the sky with shades of orange and pink, casting long shadows and creating a magical ambiance. Street musicians often chose this time to perform, their melodies adding to the park’s charm. Couples walked hand in hand, savoring the romance of the twilight hour. The park, with its timeless beauty and serene atmosphere, offered a respite from the chaos of the city, a place where one could reconnect with nature and find inner peace.', 1); 

INSERT INTO articles ('title', 'content', 'authorID') VALUES ('I am a new writer', 'New writer first time', 2); 
INSERT INTO articles ('title', 'content', 'authorID') VALUES ('This is defo different', 'Yeaa new second time', 2); 

COMMIT;


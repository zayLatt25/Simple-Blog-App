PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS authors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    displayName TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    blogTitle TEXT NOT NULL,
    blogSubtitle TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    views INT DEFAULT 0,
    likes INT DEFAULT 0,
    published TEXT NOT NULL,
    authorID INT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    publishedAt DATETIME,
    FOREIGN KEY (authorID) REFERENCES authors(id)
);

CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    readerName TEXT NOT NULL,
    content TEXT NOT NULL,
    articleID INT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (articleID) REFERENCES articles(id)
);

INSERT INTO authors ('name', 'displayName', 'email' ,'password', 'blogTitle', 'blogSubtitle') VALUES ('John Doe', 'Starry Traveler', 'john123@gmail.com', '12345', 'Traveling the world', 'One country at a time');
INSERT INTO authors ('name', 'displayName', 'email' ,'password', 'blogTitle', 'blogSubtitle') VALUES ('Alex Green', 'Quantum Quill', 'alex.green@gmail.com', 'password123', 'Writing about the universe', 'One article at a time');

INSERT INTO articles ('title', 'content', 'likes', 'published', 'publishedAt', 'authorID') VALUES ('My first article', 'In the heart of the bustling city, nestled between towering skyscrapers and the constant hum of traffic, lay a small, serene park that often went unnoticed by the hurried passersby. This park, a verdant oasis amidst the concrete jungle, was a sanctuary for those who sought a moment of peace and solitude. The air here was different; it carried the sweet scent of blooming flowers and the fresh aroma of dew-kissed grass. As the morning sun began to rise, casting a golden hue across the landscape, the park came to life with the gentle chirping of birds and the soft rustling of leaves in the breeze. At one corner of the park stood an ancient oak tree, its gnarled branches stretching out like protective arms over a weathered wooden bench. This bench had seen countless stories unfold, from the elderly couple who visited every afternoon to relive their memories, to the young artist who found inspiration in the tranquility of the surroundings. Nearby, a small pond shimmered under the sunlight, its surface occasionally disturbed by the playful antics of ducks and the gentle splash of fish breaking the water. The pond’s edge was adorned with a variety of flowers, their vibrant colors reflecting in the clear water and creating a picturesque scene.

In the center of the park, a winding path, lined with benches and lampposts, invited visitors to take a leisurely stroll. The path meandered through well-tended gardens, where the meticulous work of gardeners was evident in the perfectly trimmed hedges and the harmonious arrangement of plants. Each section of the garden seemed to tell a story of its own, with flowers of different seasons blooming in unison, creating a tapestry of colors and fragrances.

As the day progressed, the park became a haven for people from all walks of life. Joggers, clad in bright athletic wear, ran along the path, their rhythmic footsteps blending with the natural sounds. Parents with young children in tow found solace in the play area, where laughter and joyous shouts filled the air. Office workers on their lunch breaks sought refuge from their hectic schedules, sitting on the benches and enjoying a moment of quiet reflection.

As evening approached, the park transformed once again. The setting sun painted the sky with shades of orange and pink, casting long shadows and creating a magical ambiance. Street musicians often chose this time to perform, their melodies adding to the park’s charm. Couples walked hand in hand, savoring the romance of the twilight hour. The park, with its timeless beauty and serene atmosphere, offered a respite from the chaos of the city, a place where one could reconnect with nature and find inner peace.', 10 , 'TRUE', CURRENT_TIMESTAMP , 1); 

INSERT INTO articles ('title', 'content', 'published', 'authorID') VALUES ('My third article', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel turpis non elit fermentum vehicula. Ut eget efficitur augue. Curabitur dapibus consequat ex nec feugiat. Sed gravida nunc vel erat ullamcorper, sit amet facilisis risus luctus. Maecenas imperdiet tortor in leo consectetur, in tristique erat convallis. Vivamus ultricies tristique purus, sit amet molestie lorem ullamcorper non. Pellentesque ac libero ac sapien efficitur tincidunt ac eget metus. Donec venenatis urna et arcu convallis, nec tincidunt felis vestibulum. Etiam et ante turpis.

In at erat sit amet nunc aliquet bibendum. Fusce tempus dui non magna vehicula, id elementum erat dignissim. Vestibulum ultricies, risus nec lacinia mollis, nisl elit pretium lacus, vel fermentum elit tortor vel enim. Donec euismod ex nec nulla sollicitudin, a convallis risus bibendum. Nulla auctor nunc vel nisl facilisis, ut tincidunt tortor auctor. Fusce aliquet velit non efficitur efficitur. Integer tincidunt, erat at pellentesque sodales, magna est consectetur felis, sit amet euismod arcu felis sit amet sapien. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer auctor ligula non nunc laoreet aliquet. Duis ut urna et ex iaculis venenatis.

Suspendisse potenti. Cras fermentum orci ut nunc scelerisque, a efficitur ligula dapibus. Phasellus efficitur sapien et lacus ultrices fermentum. Suspendisse nec dui ullamcorper, auctor ex sit amet, lobortis risus. Integer consectetur volutpat augue in aliquet. Vivamus convallis magna nec dolor finibus scelerisque. Proin eu convallis lorem. Sed vitae magna in sapien varius dignissim. Ut pharetra lorem nec nulla aliquet, et ullamcorper metus suscipit. Vivamus id eros ac erat fermentum facilisis. Duis at fringilla mi. Sed ut ligula at magna dapibus tincidunt. Mauris auctor ante nec arcu bibendum, sit amet sodales est gravida. Etiam efficitur feugiat lacus, sit amet luctus orci ornare sed. Phasellus sed magna vitae ligula tincidunt aliquam. Nam pharetra felis sed semper ullamcorper.', 'FALSE', 1); 

COMMIT;


const express = require("express");
const router = express.Router();
const { cutText } = require("../utils/helper-functions");

// Render the reader home page
router.get("/home", (req, res, next) => {
  // Get the latest 2 articles from the database
  const queryNewArticles = `
        SELECT 
            ar.id, 
            ar.title, 
            ar.content,
            ar.likes, 
            ar.views,
            ar.publishedAt, 
            au.displayName AS authorName,
            COUNT(c.id) AS comments
        FROM 
            articles ar 
        JOIN 
            authors au ON ar.authorID = au.id 
        LEFT JOIN 
            comments c ON ar.id = c.articleID
        WHERE 
            ar.published = 'TRUE'
        GROUP BY 
            ar.id, ar.title, ar.content, ar.likes, ar.views, ar.publishedAt, au.name
        ORDER BY 
            ar.createdAt DESC 
        LIMIT 2`;

  // Get the 7 most popular articles from the database
  // Popularity is determined by the number of likes and comments
  const queryFeaturedArticles = `
        SELECT 
            ar.id, 
            ar.title, 
            ar.content,
            ar.likes, 
            ar.views,
            ar.publishedAt, 
            au.displayName AS authorName,
            COUNT(c.id) AS comments,
            (ar.likes * COUNT(c.id)) AS popularity
        FROM 
            articles ar 
        JOIN 
            authors au ON ar.authorID = au.id 
        LEFT JOIN 
            comments c ON ar.id = c.articleID
        WHERE 
            ar.published = 'TRUE'
        GROUP BY 
            ar.id, ar.title, ar.content, ar.likes, ar.views, ar.publishedAt, au.name
        ORDER BY
            popularity DESC 
        LIMIT 7`;

  // Get the blogs out the authors
  const queryBlogs = `SELECT id, displayName, blogTitle, blogSubtitle FROM authors`;

  db.all(queryNewArticles, function (err, newArticles) {
    if (err) {
      next(err);
    } else {
      db.all(queryFeaturedArticles, function (err, featuredArticles) {
        if (err) {
          next(err);
        } else {
          db.all(queryBlogs, function (err, blogs) {
            if (err) {
              next(err);
            } else {
              // Pass in all the information to the reader home page
              res.render("reader-home.ejs", {
                newArticles,
                featuredArticles,
                blogs,
                session: req.session.authenticated,
                cutText,
              });
            }
          });
        }
      });
    }
  });
});

// Render the blog page of the author
router.get("/:authorID/blog", (req, res) => {
  const { authorID } = req.params;

  // Left join is used so that if the article has no comments,
  // the article info will still be fetched
  const queryCommentCount = `
        SELECT 
            ar.id AS articleID,
            ar.*,
            COUNT(c.id) AS comments
        FROM 
            articles ar
        LEFT JOIN 
            comments c ON ar.id = c.articleID
        WHERE 
            ar.authorID = ? AND ar.published = 'TRUE'
        GROUP BY 
            ar.id, ar.title, ar.content, ar.views, ar.likes, ar.published, ar.authorID, ar.createdAt, ar.updatedAt
        ORDER BY
            ar.createdAt DESC;`;

  db.get(`SELECT * from authors WHERE id = ?;`, [authorID], (err, author) => {
    if (err) {
      res.sendStatus(500);
      console.log(err);
      return;
    }
    db.all(queryCommentCount, [authorID], (err, articles) => {
      if (err) {
        res.sendStatus(500);
        console.log(err);
        return;
      }
      // Reused author home page for code reusability
      // Pass in mode to determine which elements to show
      res.render("author-home.ejs", {
        author,
        articles,
        session: req.session.authenticated,
        mode: "reader",
        cutText,
      });
    });
  });
});

module.exports = router;

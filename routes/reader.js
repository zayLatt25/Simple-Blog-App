const express = require("express");
const router = express.Router();
const { cutText } = require("../utils/helper-functions");

router.get("/home", (req, res, next) => {
  const queryNewArticles = `
        SELECT 
            ar.id, 
            ar.title, 
            ar.content,
            ar.likes, 
            ar.createdAt, 
            ar.updatedAt, 
            au.name AS authorName 
        FROM 
            articles ar 
        JOIN 
            authors au ON ar.authorID = au.id 
        WHERE 
            ar.published = 'TRUE'
        ORDER BY 
            ar.createdAt DESC LIMIT 3`;

  const queryFeaturedArticles = `
        SELECT 
            ar.id, 
            ar.title, 
            ar.content, 
            ar.likes, 
            ar.createdAt, 
            ar.updatedAt, 
            au.name AS authorName  
        FROM 
            articles ar
        JOIN 
            authors au ON ar.authorID = au.id
        WHERE 
            ar.published = 'TRUE'
        ORDER BY
            ar.likes DESC LIMIT 3`;

  const queryBlogs = `SELECT name, blogTitle, blogSubtitle FROM authors`;

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

module.exports = router;

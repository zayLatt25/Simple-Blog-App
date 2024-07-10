const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  queryNewArticles =
    "SELECT articles.title, articles.content, articles.createdAt, articles.updatedAt, authors.name AS authorName FROM articles JOIN authors ON articles.authorID = authors.id ORDER BY articles.createdAt DESC LIMIT 3";

  queryFeaturedArticles =
    "SELECT articles.title, articles.content, articles.createdAt, articles.updatedAt, authors.name AS authorName FROM articles JOIN authors ON articles.authorID = authors.id";

  queryBlogs = "SELECT name, blogTitle, blogSubtitle FROM authors";

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
              });
            }
          });
        }
      });
    }
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  queryNewArticles =
    "SELECT articles.id, articles.title, articles.content, articles.createdAt, articles.updatedAt, writers.name AS writerName FROM articles JOIN writers ON articles.writerID = writers.id ORDER BY articles.createdAt DESC LIMIT 3";

  queryFeaturedArticles =
    "SELECT articles.id, articles.title, articles.content, articles.createdAt, articles.updatedAt, writers.name AS writerName FROM articles JOIN writers ON articles.writerID = writers.id";

  db.all(queryNewArticles, function (err, newArticles) {
    if (err) {
      next(err);
    } else {
      db.all(queryFeaturedArticles, function (err, featuredArticles) {
        if (err) {
          next(err);
        } else {
          res.render("reader-home.ejs", { newArticles, featuredArticles });
        }
      });
    }
  });
});

router.get("/check-article", (req, res, next) => {
  queryArticles =
    "SELECT articles.id, articles.title, articles.content, articles.createdAt, articles.updatedAt, writers.name AS writerName FROM articles JOIN writers ON articles.writerID = writers.id ORDER BY articles.createdAt DESC LIMIT 3";

  queryFeaturedArticles =
    "SELECT articles.id, articles.title, articles.content, articles.createdAt, articles.updatedAt, writers.name AS writerName FROM articles JOIN writers ON articles.writerID = writers.id";

  db.all(queryArticles, function (err, rows) {
    if (err) {
      next(err);
    } else {
      res.json({ articles: rows });
    }
  });
});

module.exports = router;

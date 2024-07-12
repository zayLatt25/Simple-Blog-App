const express = require("express");
const router = express.Router();

router.get("/:articleId", (req, res, next) => {
  const articleId = req.params.articleId;

  const queryArticle = ` SELECT articles.*, authors.name AS authorName
    FROM articles
    JOIN authors ON articles.authorID = authors.id
    WHERE articles.id = ?`;

  db.get(queryArticle, [articleId], (err, article) => {
    if (err) {
      next(err);
    } else if (article) {
      res.render("article.ejs", {
        article,
        session: req.session.authenticated,
      });
    } else {
      res.status(404).send("Article not found");
    }
  });
});

module.exports = router;

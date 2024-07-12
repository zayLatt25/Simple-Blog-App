const express = require("express");
const router = express.Router();

router.get("/:articleId", (req, res, next) => {
  const articleId = req.params.articleId;
  console.log(articleId);

  const queryArticle = ` SELECT ar.*, au.name AS authorName
    FROM articles ar
    LEFT JOIN authors au ON ar.authorID = au.id
    WHERE ar.id = ?`;

  db.get(queryArticle, [articleId], (err, article) => {
    if (err) {
      next(err);
    } else if (article) {
      res.render("article.ejs", {
        article,
        session: req.session.authenticated,
      });
    } else {
      res.status(404).send("Article not found! Please try again");
    }
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();

router.get("/:articleId", (req, res, next) => {
  const articleId = req.params.articleId;

  const queryArticle = ` 
        SELECT 
            ar.*, au.displayName AS authorName
        FROM 
            articles ar
        JOIN 
            authors au ON ar.authorID = au.id
        WHERE 
            ar.id = ?`;

  const queryComments = `SELECT * FROM comments WHERE articleID = ?`;

  const queryViews = `UPDATE articles SET views = views + 1 WHERE id = ?`;

  db.get(queryArticle, [articleId], (err, article) => {
    if (err) {
      res.sendStatus(500);
    } else if (!article) {
      res.status(404).send("Article not found! Please try again");
    } else {
      const id = req.session.user ? req.session.user.id : null;
      if (id !== article.authorID) {
        db.run(queryViews, [articleId], (err) => {
          if (err) {
            res.sendStatus(500);
          }
        });
      }
      db.all(queryComments, [articleId], (err, comments) => {
        if (err) {
          res.sendStatus(500);
        } else {
          res.render("article.ejs", {
            article,
            comments,
            session: req.session.user,
          });
        }
      });
    }
  });
});

router.post("/:articleId/comments", (req, res, next) => {
  const { articleId } = req.params;
  const { content, readerName } = req.body;

  const query = `INSERT INTO comments (articleID, readerName, content)
    VALUES (?, ?, ?)`;

  db.run(query, [articleId, readerName, content], function (err) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.redirect(`/article/${articleId}`);
    }
  });
});

router.get("/:articleId/like", (req, res, next) => {
  const { articleId } = req.params;

  const query = `UPDATE articles SET likes = likes + 1 WHERE id = ?`;

  db.run(query, [articleId], function (err) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.redirect(`/article/${articleId}`);
    }
  });
});

module.exports = router;

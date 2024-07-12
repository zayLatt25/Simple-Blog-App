const express = require("express");
const router = express.Router();
const { cutText } = require("../utils/helper-functions");

router.get("/home", (req, res) => {
  const authorId = req.session.user.id;

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
            ar.authorID = ?
        GROUP BY 
            ar.id, ar.title, ar.content, ar.views, ar.likes, ar.published, ar.authorID, ar.createdAt, ar.updatedAt;`;

  db.get(`SELECT * from authors WHERE id = ?;`, [authorId], (err, author) => {
    if (err) {
      res.sendStatus(500);
      console.log(err);
      return;
    }
    db.all(queryCommentCount, [authorId], (err, articles) => {
      if (err) {
        res.sendStatus(500);
        console.log(err);
        return;
      }
      res.render("author-home.ejs", {
        author,
        articles,
        session: req.session.authenticated,
        cutText,
      });
    });
  });
});

router.get("/:articleId/edit", (req, res) => {
  const { articleId } = req.params;
  const { id } = req.session.user;

  const query = `SELECT * FROM articles WHERE id = ? AND authorID = ?;`;

  db.get(query, [articleId, id], (err, article) => {
    if (err) {
      res.sendStatus(500);
      console.log(err);
      return;
    }
    // Author authentication check
    if (!article) {
      // Forbidden, meaning that the user is not the author of the article
      // and has no permission to edit
      res.send("Error 403: Unable to access this page!");
      return;
    }
    res.render("edit-article.ejs", {
      article,
      session: req.session.authenticated,
    });
  });
});

router.post("/new-article", (req, res) => {
  const { title, content, published } = req.body;
  const authorID = req.session.user.id;

  const query = `
        INSERT INTO articles (title, content, authorID)
        VALUES (?, ?, ?);`;
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { cutText } = require("../utils/helper-functions");

router.get("/home", (req, res) => {
  const authorId = req.session.user.id;

  // Left join is used so that if the author has no articles,
  // the author's info will still be fetched'
  const queryAuthor = `SELECT * from authors WHERE id = ?;`;

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

  db.get(queryAuthor, [authorId], (err, author) => {
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

router.post("/new-article", (req, res) => {
  const { title, content, published } = req.body;
  const authorID = req.session.user.id;

  const query = `
        INSERT INTO articles (title, content, authorID)
        VALUES (?, ?, ?);`;
});

module.exports = router;

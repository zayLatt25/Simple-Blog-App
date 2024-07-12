const express = require("express");
const router = express.Router();
const { cutText } = require("../utils/helper-functions");

router.get("/home", (req, res) => {
  const authorId = req.session.user.id;

  // Left join is used so that if the author has no articles,
  // the author's info will still be fetched'
  const query = `
        SELECT 
            au.id,
            au.displayName,
            au.blogTitle,
            au.blogSubtitle,
            ar.title,
            ar.content,
            ar.likes,
            ar.published,
            ar.createdAt,
            ar.updatedAt
        FROM 
            authors au
        LEFT JOIN 
            articles ar ON au.id = ar.authorID
        WHERE 
            au.id = ?;`;

  db.all(query, [authorId], (err, data) => {
    if (err) {
      res.sendStatus(500);
      return;
    }
    console.log(data);
    res.render("author-home.ejs", {
      data,
      session: req.session.authenticated,
      cutText,
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

const express = require("express");
const router = express.Router();
const { cutText } = require("../utils/helper-functions");

router.get("/home", (req, res) => {
  const email = req.session.user.email;

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
            ar.published,
            ar.createdAt,
            ar.updatedAt
        FROM 
            authors au
        LEFT JOIN 
            articles ar ON a.id = ar.authorID
        WHERE 
            a.email = ?;`;

  db.all(query, [email], (err, data) => {
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

module.exports = router;

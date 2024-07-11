const express = require("express");
const router = express.Router();

router.get("/home", (req, res) => {
  const email = req.session.user.email;

  // Left join is used so that if the author has no articles,
  // the author's info will still be fetched'
  const query = `
        SELECT 
            a.displayName,
            a.blogTitle,
            a.blogSubtitle,
            ar.title,
            ar.content,
            ar.createdAt,
            ar.updatedAt
        FROM 
            authors a
        LEFT JOIN 
            articles ar ON a.id = ar.authorID
        WHERE 
            a.email = ?;`;

  db.get(query, [email], (err, data) => {
    if (err) {
      res.sendStatus(500);
      return;
    }
    // console.log(data);
    res.render("author-home.ejs", { data, session: req.session.authenticated });
  });
});

module.exports = router;

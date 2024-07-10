const express = require("express");
const router = express.Router();

router.get("/reader-home", (req, res, next) => {
  queryArticles = "SELECT * FROM articles";
  //   queryBlogs = "SELECT * FROM blogs";

  db.all(queryArticles, function (err, rows) {
    if (err) {
      next(err);
    } else {
      res.render("reader-home.ejs", { articles: rows });
    }
  });
});

module.exports = router;

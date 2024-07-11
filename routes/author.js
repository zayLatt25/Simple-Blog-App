const express = require("express");
const router = express.Router();

router.get("/home", (req, res) => {
  res.render("author-home.ejs", { session: req.session.authenticated });
});

module.exports = router;

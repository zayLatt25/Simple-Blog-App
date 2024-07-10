const express = require("express");
const router = express.Router();

router.get("/reader-home", (req, res) => {
  res.render("reader-home.ejs");
});

module.exports = router;

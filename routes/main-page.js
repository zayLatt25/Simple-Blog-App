const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("main-page.ejs");
});

module.exports = router;

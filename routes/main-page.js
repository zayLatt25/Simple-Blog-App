const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("main-page.ejs", {
    session: req.session.authenticated,
  });
});

module.exports = router;

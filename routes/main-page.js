const express = require("express");
const router = express.Router();

// Render the main page with the session
router.get("/", (req, res) => {
  res.render("main-page.ejs", {
    session: req.session.authenticated,
  });
});

module.exports = router;

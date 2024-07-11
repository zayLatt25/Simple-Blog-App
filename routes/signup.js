const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("login-signup.ejs", { form: "signup" });
});

module.exports = router;

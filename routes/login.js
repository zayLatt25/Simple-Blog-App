const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("login-signup.ejs", { form: "login" });
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  db.insert(
    "SELECT * FROM authors WHERE email = ? AND password = ?",
    [email, password],
    (err, row) => {
      if (err) {
        console.error(err.message);
        res.sendStatus(500);
        return;
      }
      if (row) {
        req.session.authenticated = true;
        req.session.user = { email, password };
        res.redirect("/reader-home");
      } else {
        res.sendStatus(401);
      }
    }
  );
});

module.exports = router;

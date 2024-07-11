const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("login-signup.ejs", {
    form: "login",
    status: 200,
  });
});

router.post("/", (req, res) => {
  const { email, password } = req.body;

  db.get(
    "SELECT password FROM authors WHERE email = ?",
    [email],
    (err, row) => {
      if (err) {
        console.error(err.message);
        // Internal Server Error
        res.render("login-signup.ejs", {
          form: "login",
          status: 500,
          session: req.session.authenticated,
        });
      }
      if (row && row.password === password) {
        req.session.authenticated = true;
        req.session.user = { email, password };
        const redirectTo = req.session.redirectTo || "/main-page";
        res.redirect(redirectTo);
      } else {
        // Invalid username or password
        res.render("login-signup.ejs", {
          form: "login",
          status: 401,
          session: req.session.authenticated,
        });
      }
    }
  );
});

module.exports = router;

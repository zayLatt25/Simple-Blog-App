const express = require("express");
const router = express.Router();

// Render the login/signup page with a status code
router.get("/", (req, res) => {
  res.render("login-signup.ejs", {
    form: "login",
    status: 200,
  });
});

// Handle the login form submission
// If the email and password is incorrect, send a 401 status code
// and render the login/signup page again
// Else just set the session to authenticated and redirect to where
// the user was trying to go
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

        db.get(
          "SELECT id FROM authors WHERE email = ?",
          [email],
          (err, author) => {
            if (err) {
              console.error(err.message);
              // Internal Server Error
              res.render("login-signup.ejs", {
                form: "login",
                status: 500,
                session: req.session.authenticated,
              });
              return;
            }
            // Successfully logged in
            req.session.user = { id: author.id };
            const redirectTo = req.session.redirectTo || "/";
            res.redirect(redirectTo);
          }
        );
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

const express = require("express");
const router = express.Router();

// Render the signup page
// Reused the same page as login page but with a different form
// The form determines which elements to render
router.get("/", (req, res) => {
  res.render("login-signup.ejs", {
    form: "signup",
    status: 200,
  });
});

// Handle the signup form submission
router.post("/", (req, res) => {
  const { name, displayName, email, password, blogTitle, blogSubtitle } =
    req.body;
  db.run(
    "INSERT INTO authors (name, displayName, email, password, blogTitle, blogSubtitle) VALUES (?, ?, ?, ?, ?, ?)",
    [name, displayName, email, password, blogTitle, blogSubtitle],
    function (err) {
      if (err) {
        if (err.errno === 19) {
          // Email already exists
          res.render("login-signup.ejs", { form: "signup", status: 409 });
        } else {
          // Internal Server Error
          res.render("login-signup.ejs", { form: "signup", status: 500 });
        }
      } else {
        // User created successfully
        // Set authenticated property of session to true
        // This property will be used in multiple .ejs files to determine
        // which elements to render based on user's authentication
        req.session.authenticated = true;
        req.session.user = { id: this.lastID };
        res.redirect("/author/home");
      }
    }
  );
});

module.exports = router;

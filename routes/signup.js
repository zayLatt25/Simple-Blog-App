const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("login-signup.ejs", {
    form: "signup",
    status: 200,
  });
});

router.post("/", (req, res) => {
  const { name, displayName, email, password, blogTitle, blogSubtitle } =
    req.body;
  console.log(req.body);
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
        req.session.authenticated = true;
        console.log("User created with row id: " + this.lastID);
        req.session.user = { email };
        res.redirect("/author/home");
      }
    }
  );
});

module.exports = router;

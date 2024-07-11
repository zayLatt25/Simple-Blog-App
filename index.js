const express = require("express");
const session = require("express-session");
const store = new session.MemoryStore();
const app = express();
const port = 3000;
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

const sqlite3 = require("sqlite3").verbose();
global.db = new sqlite3.Database("./database.db", function (err) {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log("Database connected");
    global.db.run("PRAGMA foreign_keys=ON");
  }
});

app.get("/", (req, res) => {
  res.render("main-page");
});

app.use(
  session({
    // My randomly generated 32 byte string
    secret: "5e24189f28fec9e707411e0b9dce207bb629dc244eade1d64007f83b9b8d5f7d",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
    store,
  })
);

// Middleware function to check login
app.use((req, res, next) => {
  if (!req.body.email || !req.body.password) {
    // If username or password is not provided, continue to the next middleware
    return next();
  }

  const { email, password } = req.body;

  if (req.session.authenticated) {
    return next();
  } else {
    db.get(
      "SELECT password FROM authors WHERE email = ?",
      [email],
      (err, row) => {
        if (err) {
          console.error(err.message);
          // Internal Server Error
          res.sendStatus(500);
          return;
        }
        if (row && row.password === password) {
          req.session.authenticated = true;
          req.session.user = { email, password };
          return next();
        } else {
          // Invalid username or password
          res.sendStatus(401);
          return;
        }
      }
    );
  }
});

const usersRoutes = require("./routes/users");
app.use("/users", usersRoutes);

const readerRoutes = require("./routes/reader-home");
app.use("/reader-home", readerRoutes);

const articleRoutes = require("./routes/article");
app.use("/article", articleRoutes);

app.use("/login", (req, res) => {
  res.json({ message: "Login successful" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

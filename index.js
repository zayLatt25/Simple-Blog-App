const express = require("express");
const session = require("express-session");
const { checkLogin } = require("./utils/helper-functions");

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

// Session middleware
app.use(
  session({
    // My randomly generated 32 byte string
    secret: "5e24189f28fec9e707411e0b9dce207bb629dc244eade1d64007f83b9b8d5f7d",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

// Routes that doesnt need login
const mainPageRoutes = require("./routes/main-page");
app.use("/", mainPageRoutes);
const loginRoutes = require("./routes/login");
app.use("/login", loginRoutes);
const logoutRoutes = require("./routes/logout");
app.use("/logout", logoutRoutes);
const signUpRoutes = require("./routes/signup");
app.use("/signup", signUpRoutes);
const readerRoutes = require("./routes/reader");
app.use("/reader", readerRoutes);
const articleRoutes = require("./routes/article");
app.use("/article", articleRoutes);

//Routes that require login are protected by middleware
const authorRoutes = require("./routes/author");
app.use("/author", checkLogin, authorRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const express = require("express");
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

const usersRoutes = require("./routes/users");
app.use("/users", usersRoutes);

const readerRoutes = require("./routes/reader-home");
app.use("/reader-home", readerRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

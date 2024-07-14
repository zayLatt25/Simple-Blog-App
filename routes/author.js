const express = require("express");
const router = express.Router();
const { cutText } = require("../utils/helper-functions");

// Render the author home page
router.get("/home", (req, res) => {
  const { id } = req.session.user;

  // Fetches both article data and the count of comments for each article
  // Left join is used so that if the article has no comments,
  // the article info will still be fetched.
  const queryCommentCount = `
        SELECT 
            ar.id AS articleID,
            ar.*,
            COUNT(c.id) AS comments
        FROM 
            articles ar
        LEFT JOIN 
            comments c ON ar.id = c.articleID
        WHERE 
            ar.authorID = ?
        GROUP BY 
            ar.id, ar.title, ar.content, ar.views, ar.likes, ar.published, ar.authorID, ar.createdAt, ar.updatedAt
        ORDER BY
            ar.createdAt DESC;`;

  db.get(`SELECT * from authors WHERE id = ?;`, [id], (err, author) => {
    if (err) {
      res.sendStatus(500);
      console.log(err);
      return;
    }
    db.all(queryCommentCount, [id], (err, articles) => {
      if (err) {
        res.sendStatus(500);
        console.log(err);
        return;
      }
      res.render("author-home.ejs", {
        author,
        articles,
        session: req.session.authenticated,
        mode: "author",
        cutText,
      });
    });
  });
});

// Render the author settings page
router.get("/settings", (req, res) => {
  const { id } = req.session.user;

  db.get(
    `SELECT name, displayName, email, blogTitle, blogSubtitle FROM authors WHERE id = ?;`,
    [id],
    (err, author) => {
      if (err) {
        res.sendStatus(500);
        console.log(err);
        return;
      }
      res.render("author-settings.ejs", {
        author,
        session: req.session.authenticated,
        status: 200,
      });
    }
  );
});

// Endpoint to update author settings
router.post("/updateSettings", (req, res) => {
  const { name, displayName, email, blogTitle, blogSubtitle } = req.body;
  const { id } = req.session.user;

  querySettings = `UPDATE authors SET name = ?, displayName = ?, email = ?, blogTitle = ?, blogSubtitle = ? WHERE id = ?;`;

  db.run(
    querySettings,
    [name, displayName, email, blogTitle, blogSubtitle, id],
    (err) => {
      if (err) {
        if (err.errno === 19) {
          // Email already exists
          res.render("author-settings.ejs", { status: 409 });
        } else {
          // Internal Server Error
          res.render("author-settings.ejs", { status: 500 });
        }
      } else {
        res.redirect("/author/home");
      }
    }
  );
});

// Fetch articles and its data for editing
router.get("/edit-article/:articleId", (req, res) => {
  const { articleId } = req.params;
  const { id } = req.session.user;

  const query = `SELECT * FROM articles WHERE id = ? AND authorID = ?;`;

  db.get(query, [articleId, id], (err, article) => {
    if (err) {
      res.sendStatus(500);
      console.log(err);
      return;
    }
    // Author authentication check
    if (!article) {
      // Forbidden, meaning that the user is not the author of the article
      // and has no permission to edit
      res.send("Error 403: Unable to access this page!");
      return;
    }
    res.render("manage-article.ejs", {
      article,
      mode: "edit",
      session: req.session.authenticated,
    });
  });
});

// Update the database with new edited article data
router.post("/edit-article/:articleId/:published", (req, res) => {
  const { title, content } = req.body;
  const { articleId, published } = req.params;
  // Authentication check to ensure that the user is the author of the article
  const authorID = req.session.user.id;

  const queryEdit = `UPDATE articles SET title = ?, content = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ? AND authorID = ?;`;
  const queryPublish = `UPDATE articles SET title = ?, content = ?, published = ?, publishedAt = CURRENT_TIMESTAMP, updatedAt = CURRENT_TIMESTAMP WHERE id = ? AND authorID = ?;`;

  if (published === "FALSE") {
    db.run(queryEdit, [title, content, articleId, authorID], (err) => {
      if (err) {
        res.sendStatus(500);
        console.log(err);
        return;
      }
      res.redirect("/author/home");
    });
  } else {
    db.run(
      queryPublish,
      [title, content, "TRUE", articleId, authorID],
      (err) => {
        if (err) {
          res.sendStatus(500);
          console.log(err);
          return;
        }
        res.redirect("/author/home");
      }
    );
  }
});

// Render the page to add a new article
router.get("/add-article", (req, res) => {
  res.render("manage-article.ejs", {
    article: null,
    session: req.session.authenticated,
  });
});

// Endpoint to add an article to the database
router.post("/add-article/:published", (req, res) => {
  const { title, content } = req.body;
  const { published } = req.params;
  const authorID = req.session.user.id;

  // Added authorID in query fetched from session for authentication purposes
  const queryAdd = `INSERT INTO articles (title, content, published, authorID) VALUES (?, ?, ?, ?);`;

  db.run(queryAdd, [title, content, published, authorID], (err) => {
    if (err) {
      res.sendStatus(500);
      console.log(err);
      return;
    }
    res.redirect("/author/home");
  });
});

// Endpoint to delete an article
router.post("/delete-article/:articleId", (req, res) => {
  const { articleId } = req.params;
  const { id } = req.session.user;

  // Added authentication check by authorID and articleID
  const queryDelete = `DELETE FROM articles WHERE id = ? AND authorID = ?;`;

  db.run(queryDelete, [articleId, id], (err) => {
    if (err) {
      res.sendStatus(500);
      console.log(err);
      return;
    }
    res.redirect("/author/home");
  });
});

module.exports = router;

function cutText(text, wordLimit) {
  if (!text) {
    return "";
  }
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
}

// Middleware function to check login
function checkLogin(req, res, next) {
  if (req.session.authenticated) {
    next();
  } else {
    req.session.redirectTo = req.originalUrl;
    res.redirect("/login");
  }
}

module.exports = { cutText, checkLogin };

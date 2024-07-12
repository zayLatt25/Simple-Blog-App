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

module.exports = { cutText };

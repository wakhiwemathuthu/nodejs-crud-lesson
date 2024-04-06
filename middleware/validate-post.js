function validatePost(req, res, next) {
  const { title, message } = req.body;
  if (!title) {
    return res.status(400).json({ message: "title is required" });
  }
  if (!message) {
    return res.status(400).json({ message: "post message is required" });
  }
  return next();
}

module.exports = validatePost;

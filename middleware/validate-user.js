function validateUser(req, res, next) {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json({ message: "username is required" });
  }
  if (!password) {
    return res.status(400).json({ message: "a password is required" });
  }
  if (password.length < 6) {
    return res
      .status(411)
      .json({ message: "password must be more than 6 characters" });
  }
  return next();
}

module.exports = validateUser;

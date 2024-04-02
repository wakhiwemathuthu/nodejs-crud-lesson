function validateUser(req, res, next) {
  const { name, age, password } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }
  if (!age) {
    return res.status(400).json({ message: "Age is required" });
  }
  if (!password) {
    return res.status(400).json({ message: "A password is required" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must me more than 6 characters" });
  }
  return next();
}

function validateSignIn(req, res, next) {
  const { name, password } = req.body;
  if (!name) {
    return res.status(400).json({ message: "username is required to signin" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ message: "A password is required to signin" });
  }
  return next();
}

module.exports = { validateSignIn, validateUser };

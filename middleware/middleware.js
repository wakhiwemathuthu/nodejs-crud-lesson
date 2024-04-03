function validateUser(req, res, next) {
  const { email, age, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
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
  console.log("User has correct data");
  return next();
}

function validateSignIn(req, res, next) {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required to signin" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ message: "A password is required to signin" });
  }
  return next();
}

module.exports = { validateSignIn, validateUser };

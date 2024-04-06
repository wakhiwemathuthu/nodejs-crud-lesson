const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    return (this.users = data);
  },
};
const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

async function signIn(req, res, next) {
  const { username, password } = req.body;
  if (!username) {
    return res.status(400).json({ message: "username is required to signin" });
  }
  if (!password) {
    return res.status(400).json({ message: "password is required to signin" });
  }
  const foundUser = usersDB.users.find((user) => user.username === username);
  if (!foundUser) {
    return res
      .status(404)
      .json({ message: "user with the provided username was not found" });
  }
  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) {
    return res.status(400).json({ message: "incorrect password" });
  }

  const accessToken = jwt.sign(
    { username: foundUser.username },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "30s" }
  );
  const refreshToken = jwt.sign(
    { username: foundUser.username },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  const otherUsers = usersDB.users.filter(
    (user) => user.username !== foundUser.username
  );
  const updatedUser = { ...foundUser, refreshToken };
  usersDB.setUsers([...otherUsers, updatedUser]);
  try {
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } catch (e) {
    console.log(e);
    next(e);
  }
}

module.exports = signIn;

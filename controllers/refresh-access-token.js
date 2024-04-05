const usersDB = {
  users: require("../data/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const path = require("path");
const fsPromises = require("fs").promises;
const jwt = require("jsonwebtoken");
require("dotenv").config();

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

function refreshAccessToken(req, res, next) {
  const refreshToken = req.cookies.jwt;
  if (!refreshToken) {
    return res.sendStatus(401);
  }
  const foundUser = usersDB.users.find(
    (user) => user.refreshToken === refreshToken
  );

  if (!foundUser) {
    return res.sendStatus(403);
  }
  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err || foundUser.email !== decoded.email) {
      return res.status(403);
    }

    const accessToken = jwt.sign(
      { email: decoded.email },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "20s" }
    );

    res.json({ accessToken });
  });
}

module.exports = refreshAccessToken;

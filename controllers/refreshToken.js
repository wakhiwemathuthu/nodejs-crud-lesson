const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    return (this.users = data);
  },
};
const jwt = require("jsonwebtoken");
require("dotenv").config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

function refreshToken(req, res) {
  const token = req.cookies.jwt;
  if (!token) {
    return res.sendStatus(401);
  }
  const foundUser = usersDB.users.find((user) => user.refreshToken === token);
  if (!foundUser) {
    return res.sendStatus(401);
  }
  jwt.verify(token, REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) {
      return res.sendStatus(409);
    }

    const accessToken = jwt.sign(
      { username: decoded.username },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    res.json({ accessToken });
  });
}

module.exports = refreshToken;

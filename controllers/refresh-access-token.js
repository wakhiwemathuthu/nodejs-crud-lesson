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
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token was specified" });
  }
  const foundUser = usersDB.users.find(
    (user) => user.refreshToken === refreshToken
  );
  if (!foundUser) {
    return res
      .status(404)
      .json({ message: "No user with specified refresh token was found" });
  }
  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
    const user = usersDB.users.find(
      (user) => user.refreshToken === refreshToken
    );
    const accessToken = jwt.sign(
      { email: decoded.email },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "20s" }
    );
    const otherUsers = usersDB.users.filter(
      (user) => user.email !== decoded.email
    );
    const updatedUser = { ...user, accessToken };
    usersDB.setUsers([...otherUsers, updatedUser]);
    try {
      await fsPromises.writeFile(
        path.join(__dirname, "..", "data", "users.json"),
        JSON.stringify(usersDB.users)
      );
      res.json({ accessToken });
    } catch (e) {
      console.error(e);
      next(e);
    }
  });
}

module.exports = refreshAccessToken;

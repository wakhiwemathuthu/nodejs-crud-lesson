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
    const otherUsers = usersDB.users.filter(
      (user) => user.email !== decoded.email
    );

    const updatedUser = { ...foundUser, accessToken };
    
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

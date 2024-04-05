const jwt = require("jsonwebtoken");
require("dotenv").config();
const usersDB = {
  users: require("../data/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

function verifyAccessToken(req, res, next) {
  const authHeaders = req.headers["authorization"];

  if (!authHeaders) {
    return res.sendStatus(401);
  }
  const token = authHeaders.split(" ")[1];
  
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(403).send("Invalid token");
    }
    console.log(decoded.email);
    next();
  });
}

module.exports = verifyAccessToken;

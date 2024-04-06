require("dotenv").config();
const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

function verifyJWT(req, res, next) {
  const authHeaders = req.headers["authorization"];
  if (!authHeaders) {
    return res.sendStatus(401);
  }
  const token = authHeaders.split(" ")[1];
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(401);
    }
    req.user = decoded.username;
    next();
  });
}

module.exports = verifyJWT;

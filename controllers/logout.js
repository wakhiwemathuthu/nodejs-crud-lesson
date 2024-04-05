const usersDB = {
  users: require("../data/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");

async function Logout(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) {
    return res.sendStatus(204);
  }
  const foundUser = usersDB.users.find((user) => user.refreshToken === token);
  if (!foundUser) {
    return res.sendStatus(204);
  }
  const otherUsers = usersDB.users.filter(
    (user) => user.refreshToken !== foundUser.refreshToken
  );
  const updatedUser = { ...foundUser, refreshToken: "" };
  usersDB.setUsers([...otherUsers, updatedUser]);
  try {
    await fsPromises.writeFile(
      path.join(__dirname, "..", "data", "users.json"),
      JSON.stringify(usersDB.users)
    );
    res.cookie("jwt", "", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.sendStatus(204);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

module.exports = Logout;

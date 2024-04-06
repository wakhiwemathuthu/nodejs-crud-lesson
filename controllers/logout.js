const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    return (this.users = data);
  },
};
const fsPromises = require("fs").promises;
const path = require("path");

async function logOut(req, res, next) {
  const refreshToken = req.cookies.jwt;

  if (!refreshToken) {
    return res.sendStatus(204);
  }
  const foundUser = usersDB.users.find(
    (user) => user.refreshToken === refreshToken
  );
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
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );
    res.cookie("jwt", "", { httpOnly: true });
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

module.exports = logOut;

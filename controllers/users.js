const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    return (this.users = data);
  },
};
const fsPromises = require("fs").promises;
const path = require("path");

async function getAllUsers(req, res) {
  return res.json(usersDB.users);
}

async function getUser(req, res) {
  const username = req.params.id;
  const foundUser = usersDB.users.find((user) => user.username === username);
  if (!foundUser) {
    return res
      .status(404)
      .json({ message: `No user was found with username: ${username}` });
  }
  return res.json(foundUser);
}

async function updateUser(req, res, next) {
  const username = req.params.id;
  const user = req.body;
  if (!user.username) {
    return res.status(400).json({ message: "There is nothing to update" });
  }
  const foundUser = usersDB.users.find((user) => user.username === username);
  if (!foundUser) {
    return res
      .status(404)
      .json({ message: `Cant update non existing user: ${username}` });
  }
  foundUser.username = username;
  usersDB.setUsers(usersDB.users);
  try {
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json")
    );
    res.json({ message: "User updated successfully" });
  } catch (e) {
    console.error(e);
    next(e);
  }
}
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


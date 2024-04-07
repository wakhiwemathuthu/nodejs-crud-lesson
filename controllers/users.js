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


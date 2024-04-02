const usersDB = {
  users: require("../data/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");

async function getAllUsers(req, res) {
  res.json(usersDB.users);
}

async function getUser(req, res) {
  const user = usersDB.users.find((user) => user.id === req.params.id);
  if (user) {
    return res.json(user);
  }
  return res
    .status(404)
    .json({ message: `User with the the id: ${req.params.id} was not found` });
}

async function updateUser(req, res, next) {
  const filteredList = usersDB.users.filter(
    (user) => user.id !== req.params.id
  );
  const user = usersDB.users.find((user) => user.id === req.params.id);
  const { name, age } = req.body;
  if (name) {
    user.name = name;
  }
  if (age) {
    user.age = age;
  }
  usersDB.setUsers([...filteredList, user]);
  try {
    await fsPromises.writeFile(
      path.join(__dirname, "..", "data", "users.json"),
      JSON.stringify(usersDB.users)
    );
    res.json(user);
  } catch (e) {
    next(e);
    console.error("An error occured writting to file users.json");
    res
      .status(500)
      .json({ message: "An error occured while updating the user" });
  }
}

async function deleteUser(req, res, next) {
  const filteredList = usersDB.users.filter(
    (user) => user.id !== req.params.id
  );
  const user = usersDB.users.find((user) => user.id === req.params.id);
  if (!user) {
    return res
      .status(404)
      .json({ message: `No user was found with id: ${req.params.id}` });
  }
  usersDB.setUsers(filteredList);
  try {
    await fsPromises.writeFile(
      path.join(__dirname, "..", "data", "users.json"),
      JSON.stringify(usersDB.users)
    );
    res.json(user);
  } catch (e) {
    next(e);
    console.error(e);
    res
      .status(500)
      .json({ message: "An error occured while deleting the user" });
  }
}

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};

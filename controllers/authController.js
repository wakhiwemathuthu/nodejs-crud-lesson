const usersDB = {
  users: require("../data/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const bcrypt = require("bcrypt");
const fsPromises = require("fs").promises;
const path = require("path");
const { v4: uuid } = require("uuid");

async function registerUser(req, res) {
  const { name, age, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { name, age, password: hashedPassword, id: uuid() };

  const sameUser = usersDB.users.find((user) => user.name === name);

  if (sameUser) {
    return res
      .status(409)
      .json({ "message ": "User with the same name already exists" });
  }
  usersDB.setUsers([...usersDB.users, newUser]);
  await fsPromises.writeFile(
    path.join(__dirname, "..", "data", "users.json"),
    JSON.stringify(usersDB.users)
  );
  res.status(201).json({ message: `New user created: ${name}` });
}

async function signIn(req, res) {
  const { name, password } = req.body;
  const user = usersDB.users.find((user) => user.name === name);
  if (!user) {
    return res
      .status(404)
      .json({ message: `User with username: ${name} was not found` });
  }
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    return res.json({ message: `User logged in: ${name}` });
  } else {
    return res.status(401).json({ message: "incorrect password" });
  }
}

module.exports = { registerUser, signIn };

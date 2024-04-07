const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    return (this.users = data);
  },
};
const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

async function signUp(req, res, next) {
  const { username, password } = req.body;
  const sameUsername = usersDB.users.find((user) => user.username === username);

  if (sameUsername) {
    return res
      .status(409)
      .json({ message: "user with the same username already exists" });
  }

  const hashedPass = await bcrypt.hash(password, 10);
  const user = {
    username,
    password: hashedPass,
    roles: { user: 100610 },
  };
  usersDB.setUsers([...usersDB.users, user]);
  try {
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );
    res.json({ message: "user created successfully" });
  } catch (e) {
    console.error(e);
    next(e);
  }
}

module.exports = signUp;

const usersDB = {
  users: require("../data/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");

async function activateAccount(req, res, next) {
  const filteredList = usersDB.users.filter(
    (user) => user.id !== req.params.id
  );
  const user = usersDB.users.find((user) => user.id === req.params.id);
  if (!user) {
    return res
      .status(404)
      .json({ message: "There is no such user to activate" });
  }
  if (user.activated === true) {
    return res.json({ message: "Account already activated" });
  }
  user.activated = true;
  usersDB.setUsers([...filteredList, user]);
  try {
    await fsPromises.writeFile(
      path.join(__dirname, "..", "data", "users.json"),
      JSON.stringify(usersDB.users)
    );
    res.json({ message: "Account activated" });
  } catch (e) {
    next(e);
    console.error("An error occured writting to file users.json");
    res
      .status(500)
      .json({ message: "An error occured while activating the user" });
  }
}

module.exports = activateAccount;

const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

router.get("/", getAllUsers);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;

const express = require("express");
const router = express.Router();
const validateUser = require("../../middleware/middleware");
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../../controllers/usersController");

router.route("/").get(getAllUsers);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;

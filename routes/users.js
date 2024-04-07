const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");
const ROLES_LIST = require("../config/roles");
const verifyRoles = require("../middleware/verifyRoles");

router.get("/", verifyRoles(ROLES_LIST.Admin,ROLES_LIST.User), getAllUsers);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;

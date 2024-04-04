const express = require("express");
const router = express.Router();
const verifyAccessToken = require("../../middleware/verify-access-token");
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../../controllers/usersController");

router.use(verifyAccessToken);
router.route("/").get(getAllUsers);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;

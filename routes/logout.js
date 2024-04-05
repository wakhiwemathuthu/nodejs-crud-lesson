const express = require("express");
const router = express.Router();
const Logout = require("../controllers/logout");

router.delete("/", Logout);

module.exports = router;

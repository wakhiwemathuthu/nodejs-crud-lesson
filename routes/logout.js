const express = require("express");
const router = express.Router();
const logOut = require("../controllers/logout");

router.delete("/", logOut);

module.exports = router;

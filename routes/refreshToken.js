const express = require("express");
const router = express.Router();
const refreshToken = require("../controllers/refreshToken");

router.get("/", refreshToken);

module.exports = router;

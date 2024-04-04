const express = require("express");
const router = express.Router();
const refreshAccessToken = require("../controllers/refresh-access-token");

router.get("/", refreshAccessToken);

module.exports = router;

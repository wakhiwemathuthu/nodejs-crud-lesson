const express = require("express");
const router = express.Router();
const signIn = require("../controllers/signin");

router.post("/", signIn);

module.exports = router;

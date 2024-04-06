const express = require("express");
const router = express.Router();
const signUp = require("../controllers/signup");
const validateUser = require("../middleware/validate-user");

router.post("/", validateUser, signUp);

module.exports = router;

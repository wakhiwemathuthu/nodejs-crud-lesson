const express = require("express");
const { registerUser, signIn } = require("../controllers/authController");
const { validateUser, validateSignIn } = require("../middleware/middleware");
const router = express.Router();

router.post("/signin", validateSignIn, signIn);
router.post("/register", validateUser, registerUser);

module.exports = router;

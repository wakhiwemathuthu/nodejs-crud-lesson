const express = require("express");
const router = express.Router();
const activateAccount = require("../controllers/account-activation");

router.get("/:id", activateAccount);

module.exports = router;
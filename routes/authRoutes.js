const express = require("express");
const router = express.Router();

const { signup, login } = require("../handlers/auth");

router.post("/login", login);
router.post("/signup", signup);

module.exports = router;

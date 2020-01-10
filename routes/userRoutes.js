const express = require("express");
const router = express.Router({ mergeParams: true });

const User = require("../models/User");
const { getUser, updateUser } = require("../controllers/user");
const { ensureCorrectUser } = require("../middlewares/auth");

router.get("/", getUser);
router.put("/", updateUser);
//router.post("/:id/aadhaar", updateAadhaar);
//router.post("/:id/payment", updatePayment);

module.exports = router;

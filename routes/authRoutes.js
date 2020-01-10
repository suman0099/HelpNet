const express = require("express");
const router = express.Router();
const passport = require("passport");

const { signup, login } = require("../controllers/auth");

router.post("/login", login);
router.post("/signup", signup);

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
    //console.log(req.user);
    const user = req.user;
    const token = user.generateAuthToken();
    return res.status(200).json({
        user,
        token
    });
});

router.get("/logout", (req, res) => {
    req.logout();
});

module.exports = router;

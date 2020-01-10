const User = require("../models/User");
const keys = require("../config/keys");

exports.login = async function(req, res, next) {
    try {
        const user = await User.findOne({ email: req.body.email });
        const isMatch = await user.comparePassword(req.body.password);

        if (isMatch) {
            const token = user.generateAuthToken();

            return res.status(200).json({
                user,
                token
            });
        } else {
            return next({
                status: 400,
                message: "Invalid Email/Password."
            });
        }
    } catch (err) {
        return next({ status: 400, message: "Invalid Email/Password" });
    }
};

exports.signup = async function(req, res, next) {
    try {
        const user = await new User({
            email: req.body.email,
            password: req.body.password
        }).save();
        const token = user.generateAuthToken();

        return res.status(200).json({
            user,
            token
        });
    } catch (err) {
        if (err.code === 11000) {
            err.message = "Sorry, that username and/or email is taken";
        }
        return next({
            status: 400,
            message: err.message
        });
    }
};

const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

exports.loginRequired = async function(req, res, next) {
    try {
        const token = req.headers.token;
        const decoded = await jwt.verify(token, keys.jwtPrivateKey);
        //console.log("loginRequired", req.params);
        if (decoded) next();
        else {
            return next({ status: 401, message: "Please Log in first" });
        }
    } catch {
        return next({ status: 400, message: "Invalid Token" });
    }
};

exports.ensureCorrectUser = async function(req, res, next) {
    try {
        const token = req.headers.token;
        const decoded = await jwt.verify(token, keys.jwtPrivateKey);
        // console.log("ensureCorrectUser", req.params);
        // console.log("token", decoded._id);
        if (decoded && decoded._id === req.params.id) {
            return next();
        } else {
            return next({ status: 401, message: "Unauthorized" });
        }
    } catch (err) {
        return next({ status: 401, message: "Unauthorized" });
    }
};

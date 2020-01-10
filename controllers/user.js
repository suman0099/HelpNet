const User = require("../models/User");

exports.getUser = async function(req, res, next) {
    try {
        const id = req.params.id;
        const user = await User.findOne({ _id: id });
        //console.log("getUser", req.params);

        if (user) return res.status(200).json({ user });
        else {
            return next({
                status: 404,
                message: "Not Found"
            });
        }
    } catch (err) {
        return next({ status: 404, message: "Not Found" });
    }
};

exports.updateUser = async function(req, res, next) {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndUpdate(id, req.body, {
            new: true
        });

        if (user) return res.status(200).json({ user });
        else return next({ status: 404, message: "Not Found" });
    } catch (err) {
        return next({
            status: 404,
            message: "Not Found"
        });
    }
};

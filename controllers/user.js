const User = require("../models/User");
const geocoder = require("../services/geocoder");

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

// radius/:zipcode/:distance/:unit
exports.getUserInRadius = async function(req, res, next) {
    try {
        const { zipcode, distance } = req.params;

        //Get lat/lng
        const loc = await geocoder.geocode(zipcode);
        const lat = loc[0].latitude;
        const lng = loc[0].longitude;

        // Calc radius using radians
        // Divide dist by radius of Earth
        // Earth Radius = 3,963 mi // 6,378 km
        const radius = distance / 6378;

        const users = await User.find({
            location: {
                $geoWithin: { $centerSphere: [[lng, lat], radius] }
            }
        });

        res.status(200).json({
            count: users.length,
            users
        });
    } catch (err) {
        return next({
            status: 400,
            message: "Bad Request"
        });
    }
};

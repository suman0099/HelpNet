const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const keys = require("../config/keys");
const geocoder = require("../services/geocoder");
const Help = require("./Help");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String,
            unique: true
        },
        aadhaarNo: {
            type: String
        },
        password: {
            type: String
        },
        helpsRequested: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Help"
            }
        ],
        helpsAccepted: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Help"
            }
        ],
        rating: {
            type: Number,
            default: 0
        },
        profileImageUrl: {
            type: String
        },
        googleId: {
            type: String
        },
        location: {
            // GeoJSON Point
            type: {
                type: String,
                enum: ["Point"]
            },
            coordinates: {
                type: [Number],
                index: "2dsphere"
            },
            formattedAddress: String,
            street: String,
            city: String,
            state: String,
            zipcode: String,
            country: String
        }
    },
    { timestamps: true }
);

userSchema.pre("save", async function(next) {
    try {
        if (!this.isModified("password")) {
            return next();
        }
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    } catch (err) {
        return next(err);
    }
});

userSchema.methods.locate = async function() {
    const loc = await geocoder.geocode(this.address);
    this.location = {
        type: "Point",
        coordinates: [loc[0].longitutde, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        street: loc[0].streetName,
        city: loc[0].city,
        state: loc[0].stateCode,
        zipcode: loc[0].zipcode,
        country: loc[0].countryCode
    };
};

userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        return next(err);
    }
};

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        {
            _id: this._id,
            email: this.email
        },
        keys.jwtPrivateKey
    );

    return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

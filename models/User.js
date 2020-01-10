const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const keys = require("../config/keys");
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
        helps: [
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

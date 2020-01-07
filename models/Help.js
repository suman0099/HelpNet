const mongoose = require("mongoose");
const User = require("./User");

const helpSchema = new mongoose.Schema(
    {
        helperId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        helpSeekerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        helperRating: {
            type: Number,
            minlength: 0,
            maxlength: 5,
            default: 0
        },
        helpSeekerRating: {
            type: Number,
            minlength: 0,
            maxlength: 5,
            default: 0
        },
        paid: {
            type: Boolean,
            default: false
        },
        completedStatus: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

const Help = mongoose.model("Help", helpSchema);

module.exports = Help;

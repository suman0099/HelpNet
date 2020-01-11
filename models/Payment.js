const mongoose = require("mongoose");
const Help = require("./Help");

const paymentSchema = new mongoose.Schema(
    {
        helpId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Help"
        },
        paymentToken: {
            type: String
        },
        amount: {
            type: Number
        },
        paymentMode: {
            type: String
        },
        refund: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

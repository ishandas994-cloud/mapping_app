const mongoose = require("mongoose");

const EdgeSchema = new mongoose.Schema(
{
    fromRoom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true
    },

    toRoom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true
    },

    floor: {
        type: Number,
        required: true
    },

    steps: {
        type: Number,
        required: true,
        min: 0
    },

    direction: {
        type: String,
        enum: ["both", "one-way"],
        default: "both"
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Edge", EdgeSchema);
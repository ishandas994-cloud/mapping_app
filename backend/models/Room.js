const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
{
    roomNo: {
        type: String,
        required: true,
        trim: true
    },

    floor: {
        type: Number,
        required: true
    },

    building: {
        type: String,
        default: "KIIT Campus"
    },

    description: {
        type: String,
        default: ""
    },

    x: {
        type: Number,
        default: 0
    },

    y: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Room", RoomSchema);
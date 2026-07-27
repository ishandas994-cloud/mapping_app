const express = require("express");
const router = express.Router();

const Room = require("../models/Room");
const Edge = require("../models/Edge");

/*
------------------------------------
Create Room
POST /api/rooms
------------------------------------
*/

router.post("/", async (req, res) => {
    try {

        const { roomNo, floor, building, description, x, y } = req.body;

        const existingRoom = await Room.findOne({
            roomNo,
            floor
        });

        if (existingRoom) {
            return res.status(400).json({
                message: "Room already exists on this floor."
            });
        }

        const room = await Room.create({
            roomNo,
            floor,
            building,
            description,
            x,
            y
        });

        res.status(201).json(room);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});


/*
------------------------------------
Get All Rooms
GET /api/rooms
------------------------------------
*/

router.get("/", async (req, res) => {

    try {

        const rooms = await Room.find().sort({
            floor: 1,
            roomNo: 1
        });

        res.json(rooms);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


/*
------------------------------------
Get Rooms Of One Floor
GET /api/rooms/floor/:floor
------------------------------------
*/

router.get("/floor/:floor", async (req, res) => {

    try {

        const rooms = await Room.find({
            floor: req.params.floor
        }).sort({
            roomNo: 1
        });

        res.json(rooms);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


/*
------------------------------------
Get Single Room
GET /api/rooms/:id
------------------------------------
*/

router.get("/:id", async (req, res) => {

    try {

        const room = await Room.findById(req.params.id);

        if (!room) {

            return res.status(404).json({
                message: "Room not found."
            });

        }

        res.json(room);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


/*
------------------------------------
Update Room
PUT /api/rooms/:id
------------------------------------
*/

router.put("/:id", async (req, res) => {

    try {

        const room = await Room.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true
            }

        );

        if (!room) {

            return res.status(404).json({
                message: "Room not found."
            });

        }

        res.json(room);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


/*
------------------------------------
Delete Room
DELETE /api/rooms/:id
------------------------------------
*/

router.delete("/:id", async (req, res) => {

    try {

        const room = await Room.findById(req.params.id);

        if (!room) {

            return res.status(404).json({
                message: "Room not found."
            });

        }

        /*
        Delete all connected edges first
        */

        await Edge.deleteMany({

            $or: [

                { fromRoom: room._id },

                { toRoom: room._id }

            ]

        });

        await room.deleteOne();

        res.json({

            message: "Room deleted successfully."

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});


module.exports = router;
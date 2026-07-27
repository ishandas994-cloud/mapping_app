const express = require("express");
const router = express.Router();

const Edge = require("../models/Edge");
const Room = require("../models/Room");

/*
=========================================
Create Connection
POST /api/edges
=========================================
*/

router.post("/", async (req, res) => {

    try {

        const { fromRoom, toRoom, steps, floor, direction } = req.body;

        if (fromRoom === toRoom) {

            return res.status(400).json({
                message: "A room cannot connect to itself."
            });

        }

        const room1 = await Room.findById(fromRoom);
        const room2 = await Room.findById(toRoom);

        if (!room1 || !room2) {

            return res.status(404).json({
                message: "Room not found."
            });

        }

        const alreadyExists = await Edge.findOne({
            fromRoom,
            toRoom
        });

        if (alreadyExists) {

            return res.status(400).json({
                message: "Connection already exists."
            });

        }

        const edge = await Edge.create({

            fromRoom,

            toRoom,

            floor,

            steps,

            direction

        });

        res.status(201).json(edge);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});


/*
=========================================
Get All Connections
GET /api/edges
=========================================
*/

router.get("/", async (req, res) => {

    try {

        const edges = await Edge.find()

            .populate("fromRoom")

            .populate("toRoom")

            .sort({
                floor: 1
            });

        res.json(edges);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});


/*
=========================================
Get Connections Of One Floor
GET /api/edges/floor/:floor
=========================================
*/

router.get("/floor/:floor", async (req, res) => {

    try {

        const edges = await Edge.find({

            floor: req.params.floor

        })

            .populate("fromRoom")

            .populate("toRoom");

        res.json(edges);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});


/*
=========================================
Update Connection
PUT /api/edges/:id
=========================================
*/

router.put("/:id", async (req, res) => {

    try {

        const edge = await Edge.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true
            }

        );

        if (!edge) {

            return res.status(404).json({

                message: "Connection not found."

            });

        }

        res.json(edge);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});


/*
=========================================
Delete Connection
DELETE /api/edges/:id
=========================================
*/

router.delete("/:id", async (req, res) => {

    try {

        const edge = await Edge.findById(req.params.id);

        if (!edge) {

            return res.status(404).json({

                message: "Connection not found."

            });

        }

        await edge.deleteOne();

        res.json({

            message: "Connection deleted."

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});

module.exports = router;
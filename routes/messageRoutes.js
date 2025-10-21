/**
 * Projektarbete DT207G
 * Skapad av: Ramona Reinholdz, rare2400
 */

const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");

const Message = require("../models/messages");


//create message
router.post("/", async (req, res) => {
    const { name, email, phoneNumber, message } = req.body;

    try {
        const costumerMessage = await Message.create({
            name,
            email,
            phoneNumber,
            message
        });
        res.status(201).json(costumerMessage);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//read all messages
router.get("/", authenticateToken, async (req, res) => {
    try {
        const costumerMessage = await Message.find();
        res.status(200).json(costumerMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//read message by id
router.get("/:id", authenticateToken, async (req, res) => {
    try {
        const costumerMessage = await Message.findById(req.params.id);
        if (!costumerMessage) {
            return res.status(404).json({ message: "message not found" });
        }
        res.status(200).json(costumerMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//update message by id
router.put("/:id", authenticateToken, async (req, res) => {
    try {
        const updatedMessage = await Message.findByIdAndUpdate(
            req.params.id,
            { contacted: req.body.contacted },
            { new: true }
        );

        if (!updatedMessage) {
            return res.status(404).json({ message: "Dish not found" });
        }

        res.status(200).json(updatedMessage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//delete message by id
router.delete("/:id", authenticateToken, async (req, res) => {
    try {
        const deletedMessage = await Message.findByIdAndDelete(req.params.id);

        if (!deletedMessage) {
            return res.status(404).json({ message: "Dish not found" });
        }

        res.status(200).json(deletedMessage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
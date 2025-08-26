/**
 * Projektarbete DT207G
 * Skapad av: Ramona Reinholdz, rare2400
 */

const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
require("dotenv").config();

const Menu = require("../models/menu");

//create dish
router.post("/", authenticateToken, async (req, res) => {
    const { name, category, ingredients, price } = req.body;

    try {
        const dish = await Menu.create({
            name,
            category,
            ingredients,
            price
        });
        res.status(201).json(dish);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//read all dishes on menu
router.get("/", async (req, res) => {
    try {
        const menu = await Menu.find();
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//read dish by id
router.get("/:id", async (req, res) => {
    try {
        const dish = await Menu.findById(req.params.id);
        if (!dish) {
            return res.status(404).json({ message: "Dish not found" });
        }
        res.status(200).json(dish);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//update dish by id
router.put("/:id", authenticateToken, async (req, res) => {
    try {
        const updatedDish = await Menu.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedDish) {
            return res.status(404).json({ message: "Dish not found" });
        }

        res.status(200).json(updatedDish);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//delete dish by id
router.delete("/:id", authenticateToken, async (req, res) => {
    try {
        const deletedDish = await Menu.findByIdAndDelete(req.params.id);

        if (!deletedDish) {
            return res.status(404).json({ message: "Dish not found" });
        }

        res.status(200).json(deletedDish);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
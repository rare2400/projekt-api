/**
 * Projektarbete DT207G
 * Skapad av: Ramona Reinholdz, rare2400
 */

require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authenticateToken");

//import User model
const User = require("../models/admin");


//register user
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        //validate input
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required to register account" });
        }

        const user = new User({ username, password });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ error: "Server error" });
    }
});


//login user
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        //validate input
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        let user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: "Incorrect username or password" });
        }

        //check password
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: "Incorrect username or password" });
        } else {
            //generate JWT token
            const payload = { username: user.username };
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '8h' });

            const response = {
                message: "user logged in",
                user: username,
                token: token
            }
            res.status(200).json({ response });
        }

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Server error" });
    }
});

//router to get all users
router.get("/users", authenticateToken, async (req, res) => {
    try {
        const result = await User.find({}, { password: 0 });
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

//router to get user by id
router.get("/users/:id", authenticateToken, async (req, res) => {
    try {
        const result = await User.findById({ _id: req.params.id }, { password: 0 });

        if (!result) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Server error" });
    }
});

//router to update user by id
router.put("/users/:id", authenticateToken, async (req, res) => {
    try {
        let result = await User.findOneAndUpdate({ _id: req.params.id }, req.body);

        result = await User.findOne({ _id: req.params.id }, { password: 0 });

        if (!result) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Server error" });
    }
});

//delete user by id
router.delete("/users/:id", authenticateToken, async (req, res) => {
    try {
        const result = await User.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});


module.exports = router;
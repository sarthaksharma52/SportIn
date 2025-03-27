const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Signup Route
router.post('/signup', async (req, res) => {
    try {
        const { name, sports, email, phone, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Create new user
        const newUser = new User({ name, sports, email, phone, password });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// Signin Route
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        // console.log("User: " + user)

        if (!user) {
            console.log("User not found");
            return res.status(404).json({ error: "User not found" });
        }

        // Use `matchPassword` method from User model
        const passwordValid = await user.matchPassword(password);
        console.log("Password match:", passwordValid);

        if (!passwordValid) {
            console.log("Password does not match");
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const jwtSecret = process.env.JWT_SECRET_KEY;
        if (!jwtSecret) {
            console.error("JWT_SECRET_KEY is missing");
            return res.status(500).json({ error: "Server configuration error" });
        }

        const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
        // console.log("Naam: " + user.name)
        res.status(200).json({
            message: "User logged in successfully",
            token,
            name: user.name
          });
          
        localStorage.setItem("name", user.name);
        // console.log(name)
        // return res.json({"name": name});
    } catch (error) {
        console.error("Signin error:", error);
        res.status(500).json({ error: "Signin failed" });
    }
});

//logout route

router.post('/logout', (req, res) => {
    res.status(200).json({ message: "User logged out successfully" });
});


// Profile Route
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Profile fetch error:", error);
        res.status(500).json({ error: "Failed to fetch profile" });
    }
});

module.exports = router;

// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Attendee = require('../models/Attendee');

const router = express.Router();

// Signup Route
router.post('/attendeeSignup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingAttendee = await Attendee.findOne({ email });
        if (existingAttendee) {
            return res.status(400).json({ message: 'Attendee already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newAttendee = new Attendee({
            username,
            email,
            password: hashedPassword,
        });

        await newAttendee.save();

        // Create a JWT token
        const token = jwt.sign({ attendeeId: newAttendee._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(201).json({ message: 'Attendee registered successfully', token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login Route
router.post('/attendeeLogin', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const attendee = await Attendee.findOne({ email });
        if (!attendee) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare the password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, attendee.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create a JWT token
        const token = jwt.sign({ attendeeId: attendee._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

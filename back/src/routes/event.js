const express = require('express');
const router = express.Router();
const Event = require('../models/Event'); // Import Event model
const Attendance = require('../models/Attendance');
const User = require('../models/User');

// ✅ GET all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find(); // Fetch events from DB
        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

// ✅ POST: Create a new event
router.post('/', async (req, res) => {
    try {
        const { title, description, date, location } = req.body;
        if (!title || !description || !date || !location) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newEvent = new Event({ title, description, date, location });
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create event' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json({ error: 'Failed to fetch event.' });
    }
});

// ✅ PUT: Update an event by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json(updatedEvent);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update event' });
    }
});

// ✅ DELETE: Remove an event by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json({ message: 'Event deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete event' });
    }
});
// Attend an event
router.post('/attend', async (req, res) => {
    const { eventId } = req.body;

    if (!eventId) {
        return res.status(400).json({ message: 'Event ID is required' });
    }

    try {
        // Find the event by its ID
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Increment the attendee count
        event.attendeesCount += 1;

        // Save the updated event
        await event.save();

        return res.status(200).json({ message: 'Attendance successfully recorded', event });

    } catch (error) {
        console.error('Error attending event:', error);
        return res.status(500).json({ message: 'Error attending the event', error: error.message });
    }
});


module.exports = router;

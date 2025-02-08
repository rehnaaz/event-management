const Event = require('../models/eventModel');
const Attendance = require('../models/Attendance');

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: "Error fetching events", error });
    }
};

// @desc    Create new event
// @route   POST /api/events
// @access  Public
const createEvent = async (req, res) => {
    try {
        const { title, description, date, location } = req.body;
        const newEvent = new Event({ title, description, date, location });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: "Error creating event", error });
    }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Public
const deleteEvent = async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting event", error });
    }
};

const attendEvent = async (req, res) => {
    const { eventId } = req.body;  // Event ID passed from the frontend
    const userId = req.user.id;  // User ID from authenticated session
    const username = req.user.username;  // Username from authenticated session

    try {
        // Check if the user has already attended this event
        const existingAttendance = await Attendance.findOne({ userId, eventId });
        if (existingAttendance) {
            return res.status(400).json({ message: 'You have already attended this event' });
        }

        // Add the attendance record
        const newAttendance = new Attendance({
            userId,
            eventId,
            eventTitle: event.title,
            username
        });
        await newAttendance.save();

        // Increment the attendees count in the event
        const event = await Event.findById(eventId);
        event.attendeesCount += 1;
        await event.save();

        // Emit event count update for real-time update
        io.emit('updateAttendeeCount', event);

        res.status(200).json({ message: 'Attendance recorded successfully', event });
    } catch (error) {
        console.error('Error attending event:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { getEvents, createEvent, deleteEvent };

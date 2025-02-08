const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event', // Reference to the Event model
        required: true,
    },
    eventTitle: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Attendance', attendanceSchema);

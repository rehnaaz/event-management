const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    date: {
        type: Date,
        required: true,
    },
    location: String,
    attendeesCount: {
        type: Number,
        default: 0,
    },
    attendeesCount: { type: Number, default: 0 },
});

module.exports = mongoose.model('Event', eventSchema);

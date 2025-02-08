const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');

// Import Routes
const authRoute = require('./src/routes/auth');
const eventRoute = require('./src/routes/event');
const attendeeRoute = require('./src/routes/attendee');
const Event = require('./src/models/Event'); // Import Event model

dotenv.config(); // Load environment variables

// Initialize Express
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*', // Adjust as needed for security
        methods: ['GET', 'POST']
    }
});

// Middleware
app.use(cors());
app.use(express.json()); // Replaces body-parser

// Routes
app.use('/api/auth', authRoute);
app.use('/api/events', eventRoute);
app.use("/api/attendee", attendeeRoute);

// ✅ WebSocket Setup (Real-Time Attendee Count)
io.on('connection', (socket) => {
    console.log('New client connected');

    // When a user joins an event
    socket.on('joinEvent', async (eventId) => {
        try {
            const event = await Event.findById(eventId);
            if (event) {
                // Send the current attendee count to the client
                socket.emit('updateAttendeeCount', event.attendees.length);
            }
        } catch (err) {
            console.error('Error fetching event:', err);
        }
    });

    // When a new attendee is added (user joins the event)
    socket.on('newAttendee', async (eventId) => {
        try {
            const event = await Event.findById(eventId);
            if (event) {
                event.attendees.push(socket.id); // Add the user to the attendees list
                await event.save();
                // Broadcast updated attendee count to all clients
                io.emit('updateAttendeeCount', { eventId, count: event.attendees.length });
            }
        } catch (err) {
            console.error('Error adding new attendee:', err);
        }
    });

    // When an attendee leaves or disconnects
    socket.on('leaveEvent', async (eventId) => {
        try {
            const event = await Event.findById(eventId);
            if (event) {
                // Remove the attendee from the list
                event.attendees = event.attendees.filter(id => id !== socket.id);
                await event.save();
                // Broadcast updated attendee count to all clients
                io.emit('updateAttendeeCount', { eventId, count: event.attendees.length });
            }
        } catch (err) {
            console.error('Error removing attendee:', err);
        }
    });

    // When a user disconnects
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// ✅ MongoDB Connection
mongoose.set('strictQuery', false); // Fix deprecation warning
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('✅ MongoDB Connected');
        server.listen(process.env.PORT || 5000, () => console.log(`🚀 Server running on port ${process.env.PORT || 5000}`));
    })
    .catch((err) => console.error('❌ MongoDB Connection Error:', err));

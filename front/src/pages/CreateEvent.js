import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';


const CreateEvent = ({ setMessage }) => {
    const [eventTitle, setEventTitle] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newEvent = {
                title: eventTitle,
                description: eventDescription,
                date: eventDate,
                location: eventLocation,
            };
            const response = await axios.post('http://localhost:5000/api/events', newEvent);
            console.log('Event created:', response.data);
            navigate('/dashboard');
            // Optionally, reset form or show success message
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    return (
        <div className="create-event-container">
            <h2>Create New Event</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} className="create-event-form">
                <div className="form-group">
                    <label>Event Title</label>
                    <input
                        type="text"
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                        placeholder="Enter Event Title"
                        required
                        className="input-field"
                    />
                </div>

                <div className="form-group">
                    <label>Event Description</label>
                    <textarea
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                        placeholder="Enter Event Description"
                        required
                        className="input-field"
                    />
                </div>

                <div className="form-group">
                    <label>Event Date</label>
                    <input
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        required
                        className="input-field"
                    />
                </div>

                <div className="form-group">
                    <label>Event Location</label>
                    <input
                        type="text"
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        placeholder="Enter Event Location"
                        required
                        className="input-field"
                    />
                </div>

                <button type="submit" className="submit-btn">Create Event</button>
            </form>
        </div>
    );
};

export default CreateEvent;
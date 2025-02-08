import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditEvent = () => {
    const { id } = useParams(); // Get event ID from URL
    const navigate = useNavigate();

    // State to hold event data
    const [eventData, setEventData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
    });

    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null); // Track errors

    // Fetch event details when component loads
    useEffect(() => {
        axios.get(`http://localhost:5000/api/events/${id}`)
            .then(response => {
                if (response.data) {
                    setEventData(response.data); // ✅ Set event data
                } else {
                    setError('Event not found'); // ⚠️ Handle missing event
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching event:', error);
                setError('Failed to fetch event. Please check the ID and try again.');
                setLoading(false);
            });
    }, [id]);

    // Handle input changes
    const handleChange = (e) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/events/${id}`, eventData);
            // alert('Event updated successfully!');
            navigate('/dashboard'); // Redirect to dashboard
        } catch (error) {
            console.error('Error updating event:', error);
            setError('Failed to update event.');
        }
    };

    // Show error message if API fails
    if (error) {
        return <div className="error-message">{error}</div>;
    }

    // Show loading state
    if (loading) {
        return <div className="loading">Loading event details...</div>;
    }

    return (
        <div className="create-event-container">
            <h2>Edit Event</h2>

            <form onSubmit={handleSubmit} className="create-event-form">
                <div className="form-group">
                    <label>Event Title</label>
                    <input
                        type="text"
                        name="title"
                        value={eventData.title || ""}
                        onChange={handleChange}
                        placeholder="Enter Event Title"
                        required
                        className="input-field"
                    />
                </div>

                <div className="form-group">
                    <label>Event Description</label>
                    <textarea
                        name="description"
                        value={eventData.description || ""}
                        onChange={handleChange}
                        placeholder="Enter Event Description"
                        required
                        className="input-field"
                    />
                </div>

                <div className="form-group">
                    <label>Event Date</label>
                    <input
                        type="date"
                        name="date"
                        value={eventData.date ? eventData.date.split('T')[0] : ""}
                        onChange={handleChange}
                        required
                        className="input-field"
                    />
                </div>

                <div className="form-group">
                    <label>Event Location</label>
                    <input
                        type="text"
                        name="location"
                        value={eventData.location || ""}
                        onChange={handleChange}
                        placeholder="Enter Event Location"
                        required
                        className="input-field"
                    />
                </div>

                <button type="submit" className="submit-btn">Update Event</button>
            </form>

        </div>
    );
};

export default EditEvent;

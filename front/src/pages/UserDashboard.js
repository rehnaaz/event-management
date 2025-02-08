import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from 'react-router-dom';
import EventCard from './EventCard';

const UserDashboard = () => {
    const [events, setEvents] = useState([]); // Store events from DB
    const [filteredEvents, setFilteredEvents] = useState([]); // Store filtered events
    const [titleKeyword, setTitleKeyword] = useState('');
    const navigate = useNavigate();

    const now = new Date();
    const minDate = now;
    const maxDate = new Date(now.getFullYear(), now.getMonth() + 6, now.getDate());

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    // Fetch all events
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/events');
                setEvents(response.data);
                setFilteredEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
                navigate('/login');
            }
        };

        fetchEvents();
    }, [navigate]);

    // Handle "Attend Event" update
    const handleAttendEvent = async (eventId) => {
        try {
            const response = await axios.post('http://localhost:5000/api/events/attend', {
                eventId,
            });

            // Update the UI with the new attendees count
            setEvents((prevEvents) =>
                prevEvents.map(event =>
                    event._id === eventId
                        ? { ...event, attendeesCount: event.attendeesCount + 1 }
                        : event
                )
            );
            setFilteredEvents((prevFiltered) =>
                prevFiltered.map(event =>
                    event._id === eventId
                        ? { ...event, attendeesCount: event.attendeesCount + 1 }
                        : event
                )
            );

            console.log('Attendance updated successfully:', response.data);
        } catch (error) {
            console.error("Error attending event:", error.response ? error.response.data : error.message);
            alert("Error attending the event. Please try again later.");
        }
    };

    return (
        <div className="dashboard-container">
            <div className="header">
                <div className="sidebar-logo">
                    <h1>Eventify</h1>
                </div>
                <ul className="sidebar-menu">
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/events">My Events</Link></li>
                </ul>
                <button onClick={() => localStorage.removeItem('guest')} className="guest-btn">Logout</button>
            </div>

            {/* Main Content */}
            <div className="dashboard-main">
                {/* Filters */}
                <div className="filters-container">
                    <div className="datepicker-container">
                        <h4>Select Date Range:</h4>
                        <DatePicker
                            selectsRange
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(update) => setDateRange(update)}
                            isClearable={true}
                            placeholderText="Select date range"
                            className="input-field custom-width"
                        />
                        {startDate && endDate && (
                            <p>
                                Selected Range: <strong>{startDate.toDateString()}</strong> to <strong>{endDate.toDateString()}</strong>
                            </p>
                        )}
                    </div>

                    <div className="filters">
                        <h4>Search Events:</h4>
                        <input
                            type="text"
                            className="input-field custom-width"
                            value={titleKeyword}
                            onChange={(e) => setTitleKeyword(e.target.value)}
                            placeholder="Search Event by Title"
                        />
                    </div>
                </div>

                {/* Events List */}
                <div className="event-list">
                    {filteredEvents.length === 0 ? (
                        <p>No events found.</p>
                    ) : (
                        filteredEvents.map(event => (
                            <EventCard
                                key={event._id}
                                event={event}
                                attendees={event.attendeesCount || 0} // Display the real-time attendee count
                                onAttend={handleAttendEvent}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import EventCard from './EventCard';

const socket = io('http://localhost:5000');

const Dashboard = () => {
  const [events, setEvents] = useState([]); // Store events from DB
  const [filteredEvents, setFilteredEvents] = useState([]); // Store filtered events
  const [titleKeyword, setTitleKeyword] = useState('');
  const [isGuest, setIsGuest] = useState(localStorage.getItem("guest") === "true");
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
        const token = localStorage.getItem('token');
        if (!token && !isGuest) {
          navigate('/login'); // Redirect to login if token is missing and not a guest
          return;
        }

        const response = await axios.get('http://localhost:5000/api/events', {
          headers: token ? { 'x-auth-token': token } : {},
        });

        setEvents(response.data);
        setFilteredEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
        navigate('/login');
      }
    };

    fetchEvents();
  }, [navigate, isGuest]);

  // Real-time attendee updates
  useEffect(() => {
    socket.on('updateAttendeeCount', (updatedEvent) => {
      setEvents((prevEvents) =>
        prevEvents.map(event =>
          event._id === updatedEvent._id ? updatedEvent : event
        )
      );
      setFilteredEvents((prevFiltered) =>
        prevFiltered.map(event =>
          event._id === updatedEvent._id ? updatedEvent : event
        )
      );
    });

    return () => {
      socket.off('updateAttendeeCount');
    };
  }, []);

  // Filter events dynamically when inputs change
  useEffect(() => {
    let filtered = [...events];

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= start && eventDate <= end;
      });
    }

    if (titleKeyword) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(titleKeyword.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  }, [startDate, endDate, titleKeyword, events]);

  // Handle event deletion
  const handleDelete = async (id) => {
    if (isGuest) return; // Guests cannot delete events

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      await axios.delete(`http://localhost:5000/api/events/${id}`, {
        headers: { 'x-auth-token': token },
      });

      setEvents(events.filter(event => event._id !== id));
      setFilteredEvents(filteredEvents.filter(event => event._id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  // Handle event update (redirect to edit page)
  const handleEdit = (id) => {
    if (isGuest) return;
    navigate(`/edit-event/${id}`);
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('guest');
    navigate('/');
  };

  return (
    <div className="dashboard-container">

      <div className="header">
        <div className="sidebar-logo">
          <h1>Eventify</h1>
        </div>
        <ul className="sidebar-menu">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="#">My Events</Link></li>
          <li><Link to="#">Profile</Link></li>
          <li><Link to="#">Settings</Link></li>
          
        </ul>
        {!isGuest && (
            <Link to="/create-event">
              <button className="create-event-btn">Create New Event</button>
            </Link>
          )}
        <button onClick={handleLogout} className="create-event-btn">Logout</button>
      </div>

      {/* Filters */}
      <div className="dashboard-main">
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
                onDelete={handleDelete}
                onEdit={handleEdit}
                attendees={event.attendeesCount || 0} // Display the real-time attendee count
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

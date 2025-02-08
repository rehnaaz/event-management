import React from 'react';

const EventCard = ({ event, onDelete, onEdit, attendees, onAttend }) => {
  const isGuest = localStorage.getItem("guest") === "true"; // Ensure it's a boolean
  const isUser = localStorage.getItem("user") === "true"; // Ensure it's a boolean
  const isAuthenticated = localStorage.getItem("token"); // Check if the user is authenticated
  const hasAttendedEvent = localStorage.getItem("attendedEvents") 
    ? JSON.parse(localStorage.getItem("attendedEvents")).includes(event._id)
    : false; // Check if the event is in the attended events list

  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Attendees:</strong> {attendees}</p>
      
      <div className="event-actions">
        {/* Show "Attend Event" button only for authenticated users and not already attended */}
        {isAuthenticated && !hasAttendedEvent && !isGuest && !isUser &&(
          <button className="attend-btn" onClick={() => onAttend(event._id)}>
            {hasAttendedEvent ? "Already Attended" : "Attend Event"}
          </button>
        )}

        {/* Show Edit and Delete buttons only for non-guests and event creators */}
        {!isGuest && isUser && (
          <>
            <button className="edit-btn" onClick={() => onEdit(event._id)}>Edit</button>
            <button className="delete-btn" onClick={() => onDelete(event._id)}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default EventCard;

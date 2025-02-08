import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import foodFestImage from '../assets/food-fest.jpg';
import musicEventImage from '../assets/music-event.jpg';
import techEventImage from '../assets/tech-event.jpg';

const Home = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsNavbarVisible(true); // Trigger navbar animation when the page loads
  }, []);

  const handleGuestLogin = () => {
    localStorage.setItem("guest", "true"); // Store guest login flag
    navigate("/dashboard"); // Redirect to Dashboard
  };

  return (
    <div className="Home">
      {/* Navbar */}
      <header className={`header ${isNavbarVisible ? 'show' : ''}`}>
        <div className="logo">
          <h1>Eventify</h1>
        </div>

        <nav>
          <ul>
            <li><Link to="#events">Events</Link></li>
            <li><Link to="#contact">Contact</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/attendeeLogin">User Login</Link></li>
            <button className='guest-btn' onClick={handleGuestLogin}>Continue as Guest</button> {/* Guest Button */}
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="hero">
        <div className="background"></div>
        <div className="content">
          <h2>Welcome to Eventify</h2>
          <p>Your one-stop platform to manage and explore events.</p>
          <button>Explore Events</button>
        </div>
      </div>

      {/* Featured Events */}
      <section id="events" className="featured-events">
        <h2>Featured Events</h2>
        <div className="event-cards">
          <div className="event-card">
            <img src={techEventImage} alt="Tech Conference" />
            <h3>Tech Conference 2025</h3>
            <p>Join industry leaders in this exciting conference!</p>
            <button>View Details</button>
          </div>
          <div className="event-card">
            <img src={musicEventImage} alt="Music Fest" />
            <h3>Music Fest</h3>
            <p>Get ready for an unforgettable music experience.</p>
            <button>View Details</button>
          </div>
          <div className="event-card">
            <img src={foodFestImage} alt="Food Festival" />
            <h3>Food Festival</h3>
            <p>A celebration of tastes from around the world.</p>
            <button>View Details</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2025 Eventify. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;

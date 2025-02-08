import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import '../App.css'; // Adjust the path as needed

const AttendeeSignup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [message, setMessage] = useState("");
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/attendee/attendeeSignup', {
                username,
                email,
                password,
            });

            console.log(response.data);
            // Redirect to login page after successful signup
            navigate('/attendeeLogin'); // Redirect to login page
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong!');
            console.log(err);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>Sign Up</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="auth-btn">Sign Up</button>
                    <p className="switch-auth">
                        Already have an account? <a href="/attendeeLogin">Login</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default AttendeeSignup;

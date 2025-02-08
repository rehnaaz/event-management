import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import '../App.css'; // Adjust the path as needed

const AttendeeLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/attendee/attendeeLogin', {
                email,
                password,
            });

            console.log(response.data);
            // Store the token in localStorage/sessionStorage
            localStorage.setItem("attendee", "true");
            localStorage.setItem('token', response.data.token);

            // Redirect to dashboard after successful login
            navigate('/userDashboard'); // Redirect to dashboard page
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials!');
            console.log(err);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
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

                    <button type="submit" className="auth-btn">Login</button>
                    <p className="switch-auth">
                        Don't have an account? <a href="/attendeeSignup">Sign Up</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default AttendeeLogin;

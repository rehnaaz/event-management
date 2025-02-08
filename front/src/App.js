import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AttendeeLogin from './pages/AttendeeLogin';
import AttendeeSignup from './pages/AttendeeSignup';
import CreateEvent from './pages/CreateEvent';
import Dashboard from './pages/Dashboard';
import EditEvent from './pages/EditEvent';
import Home from './pages/Home';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';

import './App.css';
import Login from './pages/Login';

const App = () => {
  const [newEvents, setNewEvents] = useState([]);
  const isAuthenticated = localStorage.getItem("token");

  return (
    <Router>
      <Routes >

        {/* <Route path="/dashboard" element={isAuthenticated ? <Dashboard newEvents={newEvents} /> : <Navigate to="/login" />} /> */}

        <Route path="/dashboard" element={<Dashboard newEvents={newEvents} />} />
        <Route path="/userDashboard" element={<UserDashboard newEvents={newEvents} />} />
        <Route path="/create-event" element={<CreateEvent setNewEvents={setNewEvents} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/edit-event/:id" element={<EditEvent />} />
        <Route path="/attendeeLogin" element={<AttendeeLogin />} />
        <Route path="/attendeeSignup" element={<AttendeeSignup />} />
      </Routes>
    </Router>
  );
};

export default App;
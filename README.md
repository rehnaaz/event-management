# Event Management Platform

A web-based platform built using **React**, **Node.js**, and **Express** to manage and track events. Users can register, log in, create events, and view upcoming/past events with real-time attendee tracking.

## Table of Contents
- [Project Overview](#project-overview)
- [Frontend Features](#frontend-features)
- [Backend Features](#backend-features)
- [Installation and Setup](#installation-and-setup)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Running the Application](#running-the-application)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Tech Stack](#tech-stack)
- [License](#license)

## Project Overview

The platform allows users to:
- Register, log in, and attend events.
- View upcoming and past events in a personalized dashboard.
- Create new events with detailed information.
- Track event attendance in real-time.

### Key Points:
- **Real-Time Updates**: Real-time attendee list using WebSockets.
- **Responsive Design**: Fully responsive frontend, ensuring a great experience across devices.
- **JWT Authentication**: Secure user authentication using JSON Web Tokens (JWT).
- **Event Management API**: API supports CRUD operations for event management with ownership restrictions.
- **Database**: MongoDB to store event and user data efficiently.

## Frontend Features:
1. **User Authentication**: Register, login, and guest login.
2. **Event Dashboard**: Display upcoming and past events with filters.
3. **Event Creation**: Form to create an event with event details (e.g., name, date, location, etc.).
4. **Real-Time Attendee List**: Real-time display of the attendee count for each event.
5. **Responsive Design**: Mobile-first, ensuring compatibility across all screen sizes.

## Backend Features:
1. **Authentication API**: Use JWT for secure authentication and user session management.
2. **Event Management API**: Supports CRUD operations (create, read, update, delete) for events with ownership restrictions (only the event creator can modify or delete).
3. **Real-Time Updates**: WebSockets integration for real-time attendee count updates.
4. **Database**: MongoDB to store user and event data with efficient query support.

## Installation and Setup

### Frontend

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd frontend

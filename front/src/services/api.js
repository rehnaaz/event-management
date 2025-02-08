import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const loginUser = (email, password) => axios.post(`${API_URL}/auth/login`, { email, password });
export const registerUser = (name, email, password) => axios.post(`${API_URL}/auth/register`, { name, email, password });
export const fetchEvents = (token) => axios.get(`${API_URL}/events`, { headers: { Authorization: token } });

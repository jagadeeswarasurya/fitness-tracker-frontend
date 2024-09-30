// src/utils/api.js
import axios from 'axios';

// Create an Axios instance with the base URL
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Ensure this matches your backend URL
});

// Function to register a new user
export const registerUser = async (userData) => {
    const response = await api.post('/api/users/register', userData);
    return response.data;
};

// Function to log in a user
export const loginUser = async (userData) => {
    const response = await api.post('/api/users/login', userData);
    return response.data;
};

// Function to get user's fitness goals
export const fetchFitnessGoals = async (userId) => {
    const response = await api.get(`/api/fitnessGoals/${userId}`);
    return response.data;
};

// Function to create a new fitness goal
export const createFitnessGoal = async (goalData) => {
    const response = await api.post('/api/fitnessGoals', goalData);
    return response.data;
};

// Function to get user's nutrition data
export const fetchNutritionData = async (userId) => {
    const response = await api.get(`/api/nutrition/${userId}`);
    return response.data;
};

// Function to create a new nutrition entry
export const createNutritionEntry = async (nutritionData) => {
    const response = await api.post('/api/nutrition', nutritionData);
    return response.data;
};

// Function to get user's workout data
export const fetchWorkoutData = async (userId) => {
    const response = await api.get(`/api/workouts/${userId}`);
    return response.data;
};

// Function to create a new workout entry
export const createWorkoutEntry = async (workoutData) => {
    const response = await api.post('/api/workouts', workoutData);
    return response.data;
};

export default api;

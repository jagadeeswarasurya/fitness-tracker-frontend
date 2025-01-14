import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Add request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API calls
export const loginAPI = (credentials) => api.post('/api/auth/login', credentials);
export const registerAPI = (userData) => api.post('/api/auth/register', userData);
export const logoutAPI = () => api.post('/api/auth/logout');

// Protected API calls
export const fetchUserProfile = () => api.get('/api/users/profile');
export const fetchFitnessGoals = () => api.get('/api/fitness-goals');
export const fetchWorkoutData = () => api.get('/api/workouts');
export const fetchNutritionData = () => api.get('/api/nutrition');

export default api;

import axios from 'axios';

// Create an Axios instance with the base URL
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Ensure this matches your backend URL
});

// Add a request interceptor to attach the token for protected routes
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        console.log('Token in localStorage:', token); // Debugging line
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Function to register a new user
export const registerUser = async (userData) => {
    try {
        const response = await api.post('/api/users/register', userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Function to log in a user
export const loginUser = async (userData) => {
    try {
        const response = await api.post('/api/users/login', userData);
        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Function to get user's fitness goals (updated)
export const fetchFitnessGoals = async () => {
    try {
        const response = await api.get('/api/fitness-goals'); // No userId parameter
        return response.data;
    } catch (error) {
        console.error('Error fetching fitness goals:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Function to create a new fitness goal (protected route)
export const createFitnessGoal = async (goalData) => {
    try {
        const response = await api.post('/api/fitness-goals', goalData);
        return response.data;
    } catch (error) {
        console.error('Error creating fitness goal:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Function to get user's nutrition data
export const fetchNutritionData = async () => {
    try {
        const response = await api.get('/api/nutrition'); // No userId parameter needed
        return response.data;
    } catch (error) {
        console.error('Error fetching nutrition data:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Function to create a new nutrition entry (protected route)
export const createNutritionEntry = async (nutritionData) => {
    try {
        const response = await api.post('/api/nutrition', nutritionData);
        return response.data;
    } catch (error) {
        console.error('Error creating nutrition entry:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Function to get user's workout data
export const fetchWorkoutData = async () => {
    try {
        const response = await api.get('/api/workouts'); // No userId parameter needed
        return response.data;
    } catch (error) {
        console.error('Error fetching workout data:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Function to create a new workout entry (protected route)
export const createWorkoutEntry = async (workoutData) => {
    try {
        const response = await api.post('/api/workouts', workoutData);
        return response.data;
    } catch (error) {
        console.error('Error creating workout entry:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Export the Axios instance as the default export
export default api;

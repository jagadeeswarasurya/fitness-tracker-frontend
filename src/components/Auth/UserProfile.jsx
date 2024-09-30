import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [user, setUser] = useState(null); // State for storing user profile data
    const [goals, setGoals] = useState([]); // State for storing fitness goals
    const [nutrition, setNutrition] = useState([]); // State for storing nutrition data
    const [workouts, setWorkouts] = useState([]); // State for storing workouts
    const [message, setMessage] = useState(''); // State for storing error or success messages
    const [loading, setLoading] = useState(true); // State for managing loading state

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Fetch user profile details
                const userResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setUser(userResponse.data); // Set user data to state

                // Fetch fitness goals
                const goalsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/fitness-goals`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setGoals(goalsResponse.data); // Set fitness goals to state

                // Fetch nutrition data
                const nutritionResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/nutrition`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setNutrition(nutritionResponse.data); // Set nutrition data to state

                // Fetch workouts
                const workoutsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/workouts`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setWorkouts(workoutsResponse.data); // Set workouts to state

                setLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                setMessage(error.response?.data?.message || 'Error fetching user profile'); // Handle API error
                setLoading(false); // Set loading to false even if there's an error
            }
        };

        fetchUserProfile(); // Trigger the fetch on component mount
    }, []);

    if (loading) {
        return <p>Loading profile...</p>; // Display loading message while profile is being fetched
    }

    return (
        <div className="container mt-5">
            <h2>User Profile</h2>
            {/* Display message if any */}
            {message && <div className="alert alert-info">{message}</div>}

            {/* User details */}
            {user ? (
                <div className="profile-details mb-4">
                    <p><strong>Username:</strong> {user.username}</p>
                    {user.email && <p><strong>Email:</strong> {user.email}</p>} {/* Optional email rendering */}
                    <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p> {/* Display formatted join date */}
                </div>
            ) : (
                <p>No user data found.</p>
            )}

            {/* Fitness Goals Section */}
            <h3>Your Fitness Goals</h3>
            {goals.length > 0 ? (
                <ul className="list-group mb-4">
                    {goals.map((goal) => (
                        <li key={goal._id} className="list-group-item">
                            <strong>Goal Type:</strong> {goal.goalType} - <strong>Target:</strong> {goal.target}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No fitness goals found.</p>
            )}

            {/* Nutrition Section */}
            <h3>Your Nutrition</h3>
            {nutrition.length > 0 ? (
                <ul className="list-group mb-4">
                    {nutrition.map((item) => (
                        <li key={item._id} className="list-group-item">
                            <strong>Food:</strong> {item.food} - <strong>Calories:</strong> {item.calories}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No nutrition data found.</p>
            )}

            {/* Workouts Section */}
            <h3>Your Workouts</h3>
            {workouts.length > 0 ? (
                <ul className="list-group">
                    {workouts.map((workout) => (
                        <li key={workout._id} className="list-group-item">
                            <strong>Workout Type:</strong> {workout.type} - <strong>Duration:</strong> {workout.duration} minutes
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No workouts found.</p>
            )}
        </div>
    );
};

export default UserProfile;

import React, { useState, useEffect } from 'react';
import FitnessGoalForm from './FitnessGoalForm'; // Ensure this is the correct path
import axios from 'axios';

const FitnessGoals = () => {
    const [goals, setGoals] = useState([]);
    const [refresh, setRefresh] = useState(false); // Add refresh state

    // Fetch goals when refresh state changes
    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/fitness-goals`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setGoals(response.data);
            } catch (error) {
                console.error('Error fetching goals:', error);
            }
        };

        fetchGoals();
    }, [refresh]); // Fetch goals whenever refresh changes

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Fitness Goals</h1>
            
            {/* FitnessGoalForm */}
            <div className="card shadow mb-5">
                <div className="card-body">
                    <h2 className="card-title">Add a New Goal</h2>
                    <FitnessGoalForm setRefresh={setRefresh} /> {/* Pass setRefresh to the form */}
                </div>
            </div>

            {/* Display Fitness Goals */}
            <div className="card shadow">
                <div className="card-body">
                    <h2 className="card-title">Your Fitness Goals</h2>
                    <div className="row">
                        {goals.length > 0 ? (
                            goals.map((goal) => (
                                <div className="col-md-4 mb-3" key={goal.id}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">{goal.goalType}</h5>
                                            <p className="card-text">Target: {goal.target}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center">No fitness goals found. Add one above!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FitnessGoals;

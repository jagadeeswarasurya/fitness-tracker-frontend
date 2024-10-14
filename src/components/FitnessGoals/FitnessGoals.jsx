// src/components/FitnessGoals.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFitnessGoalsStart, getFitnessGoalsSuccess, getFitnessGoalsFailure } from '../../slices/fitnessGoalsSlice'; // Adjust the import path accordingly
import FitnessGoalForm from './FitnessGoalForm'; // Ensure this path is correct
import { fetchFitnessGoals } from '../../utils/api'; // Import the API call for fetching fitness goals

const FitnessGoals = () => {
    const dispatch = useDispatch();
    const fitnessGoals = useSelector((state) => state.fitnessGoals.goals); // Adjust state path accordingly
    const loading = useSelector((state) => state.fitnessGoals.loading);
    const error = useSelector((state) => state.fitnessGoals.error);
    const userId = useSelector((state) => state.user.id); // Assuming user ID is stored in the state

    useEffect(() => {
        const fetchGoals = async () => {
            dispatch(getFitnessGoalsStart());
            try {
                const data = await fetchFitnessGoals(userId); // API call using the userId
                dispatch(getFitnessGoalsSuccess(data));
            } catch (err) {
                console.error("Error fetching fitness goals:", err); // Log the error for debugging
                dispatch(getFitnessGoalsFailure(err.message));
            }
        };

        if (userId) {
            fetchGoals(); // Fetch goals if user ID is available
        }
    }, [dispatch, userId]);

    return (
        <div>
            <h1>Your Fitness Goals</h1>
            <FitnessGoalForm />
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {fitnessGoals.map((goal) => (
                    <li key={goal._id}>{goal.goalType} - Target: {goal.target}</li>
                ))}
            </ul>
        </div>
    );
};

export default FitnessGoals;

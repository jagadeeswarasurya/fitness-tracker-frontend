// src/components/workouts/Workouts.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWorkoutsStart, getWorkoutsSuccess, getWorkoutsFailure } from '../../slices/workoutsSlice';
import WorkoutForm from './WorkoutForm'; // Ensure this path is correct

const Workouts = () => {
    const dispatch = useDispatch();
    const workouts = useSelector((state) => state.workouts.workouts);
    const loading = useSelector((state) => state.workouts.loading);
    const error = useSelector((state) => state.workouts.error);

    useEffect(() => {
        const fetchWorkouts = async () => {
            dispatch(getWorkoutsStart());
            try {
                // Replace with your API call logic to fetch workouts
                const response = await fetch('YOUR_API_URL'); // Replace with your API URL
                const data = await response.json();
                dispatch(getWorkoutsSuccess(data));
            } catch (err) {
                dispatch(getWorkoutsFailure(err.message));
            }
        };

        fetchWorkouts();
    }, [dispatch]);

    return (
        <div>
            <h1>Your Workouts</h1>
            <WorkoutForm />
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {workouts.map((workout) => (
                    <li key={workout._id}>{workout.exercise} - {workout.duration} minutes</li> // Use workout._id as key
                ))}
            </ul>
        </div>
    );
};

export default Workouts;

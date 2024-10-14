import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWorkoutsStart, getWorkoutsSuccess, getWorkoutsFailure } from '../../slices/workoutsSlice';
import WorkoutForm from './WorkoutForm'; // Ensure this path is correct
import { fetchWorkoutData } from '../../utils/api'; // Import the API call for fetching workouts

const Workouts = () => {
    const dispatch = useDispatch();
    const workouts = useSelector((state) => state.workouts.workouts);
    const loading = useSelector((state) => state.workouts.loading);
    const error = useSelector((state) => state.workouts.error);
    const userId = useSelector((state) => state.user.id); // Assuming user ID is stored in the state

    useEffect(() => {
        const fetchWorkouts = async () => {
            dispatch(getWorkoutsStart());
            try {
                const data = await fetchWorkoutData(userId); // API call using the userId
                dispatch(getWorkoutsSuccess(data));
            } catch (err) {
                console.error("Error fetching workouts:", err); // Log the error for debugging
                dispatch(getWorkoutsFailure(err.message));
            }
        };

        if (userId) {
            fetchWorkouts(); // Fetch workouts if user ID is available
        }
    }, [dispatch, userId]);

    return (
        <div>
            <h1>Your Workouts</h1>
            <WorkoutForm />
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {workouts.map((workout) => (
                    <li key={workout._id}>{workout.exercise} - {workout.duration} minutes</li>
                ))}
            </ul>
        </div>
    );
};

export default Workouts;

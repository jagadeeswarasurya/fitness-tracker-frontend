// src/components/UserProfile.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNutritionData, fetchWorkoutData, fetchFitnessGoals } from '../../utils/api'; 
import { getNutritionSuccess, getNutritionFailure } from '../../slices/nutritionSlice'; 
import { getWorkoutsSuccess, getWorkoutsFailure } from '../../slices/workoutsSlice'; 
import { getFitnessGoalsSuccess, getFitnessGoalsFailure } from '../../slices/fitnessGoalsSlice'; 

const UserProfile = () => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.id); 
    const userName = useSelector((state) => state.user.name); // Get user's name from state
    const workouts = useSelector((state) => state.workouts.workouts);
    const fitnessGoals = useSelector((state) => state.fitnessGoals.goals);
    const nutrition = useSelector((state) => state.nutrition.nutrition);
    const loading = useSelector((state) => state.nutrition.loading);
    const error = useSelector((state) => state.nutrition.error);

    useEffect(() => {
        const fetchData = async () => {
            // Fetch Nutrition Data
            try {
                const nutritionData = await fetchNutritionData(userId);
                dispatch(getNutritionSuccess(nutritionData));
            } catch (err) {
                console.error("Error fetching nutrition data:", err);
                dispatch(getNutritionFailure(err.message));
            }

            // Fetch Workout Data
            try {
                const workoutsData = await fetchWorkoutData(userId); 
                dispatch(getWorkoutsSuccess(workoutsData));
            } catch (err) {
                console.error("Error fetching workouts data:", err);
                dispatch(getWorkoutsFailure(err.message));
            }

            // Fetch Fitness Goals Data
            try {
                const goalData = await fetchFitnessGoals(userId); 
                dispatch(getFitnessGoalsSuccess(goalData));
            } catch (err) {
                console.error("Error fetching fitness goals data:", err);
                dispatch(getFitnessGoalsFailure(err.message));
            }
        };

        if (userId) {
            fetchData();
        }
    }, [dispatch, userId]);

    return (
        <div className="container mt-5" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            <h1 className="mb-4">User Profile</h1>
            {userName && <h2 className="mb-4">Welcome, {userName}!</h2>} {/* Display the user's name */}
            <div className="row">
                <div className="col-md-4">
                    <section className="mb-4">
                        <h2>Your Workouts</h2>
                        <ul className="list-group">
                            {workouts.map((workout) => (
                                <li key={workout._id} className="list-group-item">
                                    {workout.exercise} - {workout.duration} minutes
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
                <div className="col-md-4">
                    <section className="mb-4">
                        <h2>Your Nutrition Details</h2>
                        {loading ? (
                            <p>Loading nutrition data...</p>
                        ) : error ? (
                            <p className="text-danger">Error: {error}</p>
                        ) : (
                            <ul className="list-group">
                                {nutrition.map((item) => (
                                    <li key={item._id} className="list-group-item">
                                        {item.foodItem} - {item.calories} calories
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                </div>
                <div className="col-md-4">
                    <section className="mb-4">
                        <h2>Your Fitness Goals</h2>
                        <ul className="list-group">
                            {fitnessGoals.length > 0 ? (
                                fitnessGoals.map((goal) => (
                                    <li key={goal._id} className="list-group-item">
                                        {goal.goal}
                                    </li>
                                ))
                            ) : (
                                <li className="list-group-item">No fitness goals available.</li>
                            )}
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;

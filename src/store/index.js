import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import fitnessGoalsReducer from '../slices/fitnessGoalsSlice';
import nutritionReducer from '../slices/nutritionSlice';
import workoutsReducer from '../slices/workoutsSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        fitnessGoals: fitnessGoalsReducer,
        nutrition: nutritionReducer,
        workouts: workoutsReducer,
    },
});

export default store;

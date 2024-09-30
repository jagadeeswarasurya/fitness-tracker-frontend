// src/slices/workoutsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const workoutsSlice = createSlice({
    name: 'workouts',
    initialState: {
        workouts: [],
        loading: false,
        error: null,
    },
    reducers: {
        getWorkoutsStart: (state) => {
            state.loading = true;
        },
        getWorkoutsSuccess: (state, action) => {
            state.loading = false;
            state.workouts = action.payload;
            state.error = null;
        },
        getWorkoutsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        addWorkout: (state, action) => {
            state.workouts.push(action.payload);
        },
        updateWorkout: (state, action) => {
            const index = state.workouts.findIndex(workout => workout._id === action.payload._id);
            if (index !== -1) {
                state.workouts[index] = action.payload;
            }
        },
        deleteWorkout: (state, action) => {
            state.workouts = state.workouts.filter(workout => workout._id !== action.payload);
        },
    },
});

// Export actions for use in components
export const { 
    getWorkoutsStart, 
    getWorkoutsSuccess, 
    getWorkoutsFailure, 
    addWorkout, 
    updateWorkout, 
    deleteWorkout 
} = workoutsSlice.actions;

// Export the reducer to be included in the store
export default workoutsSlice.reducer;

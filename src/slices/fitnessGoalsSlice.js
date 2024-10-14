// src/slices/fitnessGoalsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const fitnessGoalsSlice = createSlice({
    name: 'fitnessGoals',
    initialState: {
        goals: [], // Initialize the state for fitness goals
        loading: false,
        error: null,
    },
    reducers: {
        getFitnessGoalsStart: (state) => {
            state.loading = true; // Set loading to true when fetching starts
        },
        getFitnessGoalsSuccess: (state, action) => {
            state.loading = false; // Set loading to false when fetching succeeds
            state.goals = action.payload; // Store the fetched goals
            state.error = null; // Reset error state
        },
        getFitnessGoalsFailure: (state, action) => {
            state.loading = false; // Set loading to false when fetching fails
            state.error = action.payload; // Store the error message
        },
        addFitnessGoal: (state, action) => {
            state.goals.push(action.payload); // Add a new fitness goal to the list
        },
        updateFitnessGoal: (state, action) => {
            const index = state.goals.findIndex(goal => goal._id === action.payload._id); // Find the goal to update
            if (index !== -1) {
                state.goals[index] = action.payload; // Update the goal if found
            }
        },
        deleteFitnessGoal: (state, action) => {
            state.goals = state.goals.filter(goal => goal._id !== action.payload); // Remove the goal from the list
        },
    },
});

// Export actions for use in components
export const { 
    getFitnessGoalsStart, 
    getFitnessGoalsSuccess, 
    getFitnessGoalsFailure, 
    addFitnessGoal, 
    updateFitnessGoal, 
    deleteFitnessGoal 
} = fitnessGoalsSlice.actions;

// Export the reducer to be included in the store
export default fitnessGoalsSlice.reducer;

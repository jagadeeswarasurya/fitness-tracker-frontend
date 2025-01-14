
import { createSlice } from '@reduxjs/toolkit';

const fitnessGoalsSlice = createSlice({
    name: 'fitnessGoals',
    initialState: {
        goals: [], 
        loading: false,
        error: null,
    },
    reducers: {
        getFitnessGoalsStart: (state) => {
            state.loading = true; 
        },
        getFitnessGoalsSuccess: (state, action) => {
            state.loading = false; 
            state.goals = action.payload; 
            state.error = null; 
        },
        getFitnessGoalsFailure: (state, action) => {
            state.loading = false; 
            state.error = action.payload; 
        },
        addFitnessGoal: (state, action) => {
            state.goals.push(action.payload); 
        },
        updateFitnessGoal: (state, action) => {
            const index = state.goals.findIndex(goal => goal._id === action.payload._id); 
            if (index !== -1) {
                state.goals[index] = action.payload; 
            }
        },
        deleteFitnessGoal: (state, action) => {
            state.goals = state.goals.filter(goal => goal._id !== action.payload); 
        },
    },
});


export const { 
    getFitnessGoalsStart, 
    getFitnessGoalsSuccess, 
    getFitnessGoalsFailure, 
    addFitnessGoal, 
    updateFitnessGoal, 
    deleteFitnessGoal 
} = fitnessGoalsSlice.actions;


export default fitnessGoalsSlice.reducer;

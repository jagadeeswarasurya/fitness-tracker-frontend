import { createSlice } from '@reduxjs/toolkit';

const fitnessGoalsSlice = createSlice({
    name: 'fitnessGoals',
    initialState: {
        goals: [],
        loading: false,
        error: null,
    },
    reducers: {
        getGoalsStart: (state) => {
            state.loading = true;
        },
        getGoalsSuccess: (state, action) => {
            state.loading = false;
            state.goals = action.payload;
            state.error = null;
        },
        getGoalsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        addGoal: (state, action) => {
            state.goals.push(action.payload);
        },
        updateGoal: (state, action) => {
            const index = state.goals.findIndex(goal => goal._id === action.payload._id);
            if (index !== -1) {
                state.goals[index] = action.payload;
            }
        },
        deleteGoal: (state, action) => {
            state.goals = state.goals.filter(goal => goal._id !== action.payload);
        },
    },
});

export const { 
    getGoalsStart, 
    getGoalsSuccess, 
    getGoalsFailure, 
    addGoal, 
    updateGoal, 
    deleteGoal 
} = fitnessGoalsSlice.actions;
export default fitnessGoalsSlice.reducer;

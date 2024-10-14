import { createSlice } from '@reduxjs/toolkit';

const nutritionSlice = createSlice({
    name: 'nutrition',
    initialState: {
        nutrition: [],
        loading: false,
        error: null,
    },
    reducers: {
        getNutritionStart: (state) => {
            state.loading = true;
        },
        getNutritionSuccess: (state, action) => {
            state.loading = false;
            state.nutrition = action.payload;
            state.error = null;
        },
        getNutritionFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        addNutrition: (state, action) => {
            state.nutrition.push(action.payload);
        },
        updateNutrition: (state, action) => {
            const index = state.nutrition.findIndex(item => item._id === action.payload._id);
            if (index !== -1) {
                state.nutrition[index] = action.payload;
            }
        },
        deleteNutrition: (state, action) => {
            state.nutrition = state.nutrition.filter(item => item._id !== action.payload);
        },
    },
});

export const { 
    getNutritionStart, 
    getNutritionSuccess, 
    getNutritionFailure, 
    addNutrition, 
    updateNutrition, 
    deleteNutrition 
} = nutritionSlice.actions;

export default nutritionSlice.reducer;

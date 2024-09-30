import { createSlice } from '@reduxjs/toolkit';

const nutritionSlice = createSlice({
    name: 'nutrition',
    initialState: {
        entries: [], // Store for nutrition entries
        loading: false,
        error: null,
    },
    reducers: {
        getEntriesStart: (state) => {
            state.loading = true; // Set loading state
        },
        getEntriesSuccess: (state, action) => {
            state.loading = false; // Loading finished
            state.entries = action.payload; // Set nutrition entries
            state.error = null; // Clear any previous error
        },
        getEntriesFailure: (state, action) => {
            state.loading = false; // Loading finished
            state.error = action.payload; // Set error message
        },
        addEntry: (state, action) => {
            state.entries.push(action.payload); // Add new entry to the array
        },
        updateEntry: (state, action) => {
            const index = state.entries.findIndex(entry => entry._id === action.payload._id);
            if (index !== -1) {
                state.entries[index] = action.payload; // Update existing entry
            }
        },
        deleteEntry: (state, action) => {
            state.entries = state.entries.filter(entry => entry._id !== action.payload); // Remove entry
        },
    },
});

// Export actions to use in components
export const { 
    getEntriesStart, 
    getEntriesSuccess, 
    getEntriesFailure, 
    addEntry, 
    updateEntry, 
    deleteEntry 
} = nutritionSlice.actions;

// Export reducer to configure store
export default nutritionSlice.reducer;

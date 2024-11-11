import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            id: null,
            name: '',
        },
        isLoggedIn: false, // Track login status
    },
    reducers: {
        setUser: (state, action) => {
            state.user = {
                id: action.payload.id,
                name: action.payload.name,
            };
            state.isLoggedIn = true; // Set login status to true
        },
        logoutUser: (state) => {
            state.user = {
                id: null,
                name: '',
            };
            state.isLoggedIn = false; // Reset login status
        },
    },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;

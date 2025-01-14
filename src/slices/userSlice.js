import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            id: null,
            name: '',
        },
        isLoggedIn: false, 
    },
    reducers: {
        setUser: (state, action) => {
            state.user = {
                id: action.payload.id,
                name: action.payload.name,
            };
            state.isLoggedIn = true; 
        },
        logoutUser: (state) => {
            state.user = {
                id: null,
                name: '',
            };
            state.isLoggedIn = false;
        },
    },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;

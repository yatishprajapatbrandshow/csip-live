import { createSlice } from '@reduxjs/toolkit';

const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        startSessionTrigger: false,
        userData: null,  // Store user data here
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;  // Store userData in Redux state
            state.startSessionTrigger = !!action.payload;  // Set startSessionTrigger based on userData
        },
    },
});

export const { setUserData } = sessionSlice.actions;
export default sessionSlice.reducer;
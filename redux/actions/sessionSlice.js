import { createSlice } from '@reduxjs/toolkit';

const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        startSessionTrigger: false,
        userData: null,  // Store user data here
        userType: "",
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;  // Store userData in Redux state
            state.startSessionTrigger = !!action.payload;  // Set startSessionTrigger based on userData
        },
        setUserType: (state, action) => {
            state.userType = action.payload
        }
    },
});

export const { setUserData,setUserType } = sessionSlice.actions;
export default sessionSlice.reducer;
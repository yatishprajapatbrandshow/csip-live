// redux/sessionSlice.js
import { createSlice } from '@reduxjs/toolkit';

const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        startSessionTrigger: false,
    },
    reducers: {
        toggleStartSession: (state) => {
            state.startSessionTrigger = !state.startSessionTrigger;
        },
    },
});

export const { toggleStartSession } = sessionSlice.actions;
export default sessionSlice.reducer;

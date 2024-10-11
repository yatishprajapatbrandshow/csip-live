import { createSlice } from '@reduxjs/toolkit';

const triggerSlice = createSlice({
    name: 'trigger',
    initialState: {
        applyTrigger: false,  // Initial state
    },
    reducers: {
        // Toggle applyTrigger state based on payload
        applyTrigger: (state, action) => {
            state.applyTrigger = !state.applyTrigger;  // Set to true or false
        },
        // Reset applyTrigger to false (or any value as needed)
        resetApplyTrigger: (state) => {
            state.applyTrigger = false;  // Reset applyTrigger to false
        }
    },
});

// Export the actions
export const { applyTrigger, resetApplyTrigger } = triggerSlice.actions;

// Export the reducer
export default triggerSlice.reducer;

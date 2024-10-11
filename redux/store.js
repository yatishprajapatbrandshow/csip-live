import { configureStore } from "@reduxjs/toolkit";
import sessionSlice from './actions/sessionSlice';
import triggerSlice from './actions/triggerSlice';
export const store = configureStore({
    reducer: {
        session: sessionSlice,
        trigger: triggerSlice
    },
});

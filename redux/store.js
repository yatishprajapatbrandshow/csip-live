import { configureStore } from "@reduxjs/toolkit";
import sessionSlice from './actions/sessionSlice';
export const store = configureStore({
    reducer: {
        session: sessionSlice
    },
});

import { configureStore } from "@reduxjs/toolkit";
import sessionSlice from '@redux/actions/sessionSlice';
export const store = configureStore({
    reducer: {
        session: sessionSlice
    },
});

import { configureStore } from "@reduxjs/toolkit";
import sessionSlice from './actions/sessionSlice';
import triggerSlice from './actions/triggerSlice';
import orderIdSlice from './actions/orderIdSlice';
import favouriteActivitySlice from './actions/favouriteActivitySlice';
export const store = configureStore({
    reducer: {
        session: sessionSlice,
        trigger: triggerSlice,
        orderId: orderIdSlice,
        favouriteActivity: favouriteActivitySlice,
    },
});

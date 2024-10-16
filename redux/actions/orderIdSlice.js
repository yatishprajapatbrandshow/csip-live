import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderId: false, // Consistent property name
};

const orderSlice = createSlice({
  name: 'order', // Name the slice accordingly
  initialState,
  reducers: {
    setOrderID: (state, action) => {
      state.orderId = action.payload; // Correctly set the property
    },
    getOrderID: (state) => {
      return state.orderId; // Return the property
    },
    removeOrderID: (state) => {
      state.orderId = false; // Reset the state
    },
  },
});

// Export the actions
export const { setOrderID, getOrderID, removeOrderID } = orderSlice.actions;

// Export the reducer to include it in the store
export default orderSlice.reducer;

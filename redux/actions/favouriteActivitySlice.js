import { createSlice } from '@reduxjs/toolkit';

const favouriteActivitySlice = createSlice({
  name: 'favouriteActivity',
  initialState: {
    favouriteActivities: [], // Stores the list of favorite activity `sid`s
  },
  reducers: {
    // Add a new activity sid to the favorites list
    addFavouriteActivity: (state, action) => {
      const newSid = action.payload;
      // Check if the `sid` already exists in the list
      if (!state.favouriteActivities.includes(newSid)) {
        state.favouriteActivities.push(newSid);
      }
    },
    // Remove an activity sid from the favorites list
    removeFavouriteActivity: (state, action) => {
      const sidToRemove = action.payload;
      // Filter out the activity by its `sid`
      state.favouriteActivities = state.favouriteActivities.filter(
        (sid) => sid !== sidToRemove
      );
    },
    storeFavouriteActivity: (state, action) => {
      console.log(action.payload);
      
      state.favouriteActivities = action.payload
    },
    // Clear all favorite activity `sid`s
    clearFavourites: (state) => {
      state.favouriteActivities = []; // Empty the favorites list
    },
  },
});

// Export the actions
export const {
  addFavouriteActivity,
  removeFavouriteActivity,
  clearFavourites,
  storeFavouriteActivity
} = favouriteActivitySlice.actions;

// Export the reducer
export default favouriteActivitySlice.reducer;

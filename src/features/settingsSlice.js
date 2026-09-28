import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: { name: "Guest User", email: "guest@example.com", role: "Developer" },
  notifications: { email: true, weekly: false, product: true },
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    toggleNotification: (state, action) => {
      const key = action.payload;
      state.notifications[key] = !state.notifications[key];
    },
  },
});

export const { updateProfile, toggleNotification } = settingsSlice.actions;
export default settingsSlice.reducer;
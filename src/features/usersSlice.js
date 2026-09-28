import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  items: [
    { id: "u1", name: "Ayesha Khan", email: "ayesha@example.com", role: "Admin", active: true },
    { id: "u2", name: "Bilal Ahmed", email: "bilal@example.com", role: "Editor", active: true },
    { id: "u3", name: "Sara Malik", email: "sara@example.com", role: "Viewer", active: false },
    { id: "u4", name: "Hamza Ali", email: "hamza@example.com", role: "Editor", active: true },
    { id: "u5", name: "Zainab Noor", email: "zainab@example.com", role: "Viewer", active: true },
  ],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: {
      reducer: (state, action) => {
        state.items.unshift(action.payload);
      },
      prepare: ({ name, email, role }) => ({
        payload: { id: nanoid(), name, email, role, active: true },
      }),
    },
    toggleUserStatus: (state, action) => {
      const user = state.items.find((u) => u.id === action.payload);
      if (user) user.active = !user.active;
    },
    deleteUser: (state, action) => {
      state.items = state.items.filter((u) => u.id !== action.payload);
    },
  },
});

export const { addUser, toggleUserStatus, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
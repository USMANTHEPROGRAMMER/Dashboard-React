import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  filter: "all", // all | pending | done
  items: [
    { id: "1", title: "Set up project with Vite", done: true },
    { id: "2", title: "Build sidebar layout", done: true },
    { id: "3", title: "Connect Redux store", done: false },
    { id: "4", title: "Write About page", done: false },
  ],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer: (state, action) => {
        state.items.unshift(action.payload);
      },
      prepare: (title) => ({
        payload: { id: nanoid(), title, done: false },
      }),
    },
    toggleTask: (state, action) => {
      const task = state.items.find((t) => t.id === action.payload);
      if (task) task.done = !task.done;
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    clearCompleted: (state) => {
      state.items = state.items.filter((t) => !t.done);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addTask, toggleTask, deleteTask, clearCompleted, setFilter } =
  tasksSlice.actions;
export default tasksSlice.reducer;
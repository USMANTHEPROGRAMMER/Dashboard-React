import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  toggleTask,
  deleteTask,
  clearCompleted,
  setFilter,
} from "../features/tasksSlice";

const filters = ["all", "pending", "done"];

const Tasks = () => {
  const dispatch = useDispatch();
  const { items, filter } = useSelector((state) => state.tasks);
  const [title, setTitle] = useState("");

  const visible = items.filter((t) =>
    filter === "all" ? true : filter === "done" ? t.done : !t.done
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const clean = title.trim();
    if (!clean) return;
    dispatch(addTask(clean));
    setTitle("");
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Tasks</h1>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs doing?"
          className="flex-1 rounded-lg border border-stone-300 bg-white px-4 py-2 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-200"
        />
        <button
          type="submit"
          className="rounded-lg bg-teal-700 px-5 py-2 font-medium text-white transition-colors hover:bg-teal-800"
        >
          Add task
        </button>
      </form>

      <div className="flex items-center justify-between">
        <div className="flex gap-1 rounded-lg bg-stone-200 p-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => dispatch(setFilter(f))}
              className={`rounded-md px-3 py-1 text-sm capitalize transition-colors ${
                filter === f ? "bg-white font-medium shadow-sm" : "text-stone-600"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <button
          onClick={() => dispatch(clearCompleted())}
          className="text-sm text-stone-500 hover:text-red-600"
        >
          Clear completed
        </button>
      </div>

      {visible.length === 0 ? (
        <p className="rounded-xl border border-dashed border-stone-300 p-8 text-center text-stone-500">
          Nothing here. Add a task above or change the filter.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {visible.map((t) => (
            <li
              key={t.id}
              className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3"
            >
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => dispatch(toggleTask(t.id))}
                className="size-4 accent-teal-700"
              />
              <span
                className={`flex-1 ${t.done ? "text-stone-400 line-through" : ""}`}
              >
                {t.title}
              </span>
              <button
                onClick={() => dispatch(deleteTask(t.id))}
                className="text-sm text-red-500 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Tasks;
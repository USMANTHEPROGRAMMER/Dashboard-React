import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Users from "./pages/Users";
import Tasks from "./pages/Tasks";
import Settings from "./pages/Settings";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route index element={<Dashboard />} />
      <Route path="analytics" element={<Analytics />} />
      <Route path="users" element={<Users />} />
      <Route path="tasks" element={<Tasks />} />
      <Route path="settings" element={<Settings />} />
      <Route path="about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default App;
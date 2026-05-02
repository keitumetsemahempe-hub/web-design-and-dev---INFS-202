import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home.jsx";
import Tasks from "./pages/Tasks.jsx";
import AddTask from "./pages/AddTask.jsx";
import TaskDetails from "./pages/TaskDetails.jsx";
import Navbar from "./components/Navbar.jsx";
import EditTask from "./pages/EditTask.jsx";
import Login from "./pages/Login.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

const API = "https://web-design-and-dev-infs-202.onrender.com/api";

export default function App() {
  const location = useLocation();

  const [tasks, setTasks] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setTasks([]);
      return;
    }

    const fetchTasks = async () => {
      try {
        const res = await fetch(`${API}/tasks`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setTasks(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      }
    };

    fetchTasks();
  }, [reload]);

  return (
    <div className="app">
      
      {location.pathname !== "/login" && <Navbar />}

      <Routes>
        <Route path="/" element={<Home tasks={tasks} />} />
        <Route path="/home" element={<Home tasks={tasks} />} />
        <Route path="/login" element={<Login setReload={setReload} />} />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks tasks={tasks} setTasks={setTasks} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-task"
          element={
            <ProtectedRoute>
              <AddTask setReload={setReload} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks/:id"
          element={
            <ProtectedRoute>
              <TaskDetails tasks={tasks} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditTask
                tasks={tasks}
                setTasks={setTasks}
                setReload={setReload}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
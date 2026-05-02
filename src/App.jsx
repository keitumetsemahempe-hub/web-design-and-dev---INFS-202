import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home.jsx";
import Tasks from "./pages/Tasks.jsx";
import AddTask from "./pages/AddTask.jsx";
import TaskDetails from "./pages/TaskDetails.jsx";
import Navbar from "./components/Navbar.jsx";
import EditTask from "./pages/EditTask.jsx";
import Login from "./pages/Login.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {

const location = useLocation();

const [tasks, setTasks] = useState([]);

return (
  <div>
    {location.pathname !== "/login" && <Navbar />}
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Home />} />


      <Route path="/tasks" element={<ProtectedRoute><Tasks tasks={tasks} setTasks={ setTasks }/></ProtectedRoute>} />
      <Route path="/add-task" element={<ProtectedRoute><AddTask tasks={tasks} setTasks={setTasks} /></ProtectedRoute>} />
      <Route path="/tasks/:id" element={<ProtectedRoute><TaskDetails tasks={tasks} /></ProtectedRoute>} />
      <Route path="/edit/:id" element={<ProtectedRoute><EditTask tasks={tasks} setTasks={setTasks} /></ProtectedRoute>} />
    </Routes>
  </div>
);
}


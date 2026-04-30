import { useNavigate } from "react-router-dom"
import "./home.css";


export default function Home({tasks}) {

  const navigate = useNavigate();

  const total = tasks?.length || 0;
  const completed = tasks?.filter(t => t.status === "done").length || 0;
    const pending = tasks?.filter(t => t.status !== "done").length || 0;

  return (
   <div className="home-container">

    <div className="home-header">
      <h1>Welcome to Task Manager</h1>
        <p>Manage your tasks efficiently and stay organized with our Task Manager app.</p>
      </div>

      <div className="stats-container">
        <div className="stat-card">
        <h3>Total Tasks</h3>
        <p className="stat-number">{total}</p>
      </div>

      <div className="stat-card">
        <h3>Completed</h3>
        <p className="stat-number i1n ">{completed}</p>
      </div>

      <div className="stat-card">
        <h3>Pending</h3>
        <p className="stat-number pending">{pending}</p>
      </div>

      </div>

      <div className="home-action">
        <button className="view-tasks-button" onClick={() => navigate("/tasks")}>View All Tasks</button>
      </div>
   </div>
  );
}
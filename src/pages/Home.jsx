import { useNavigate } from "react-router-dom"
import "./home.css";


export default function Home() {

  const navigate = useNavigate();

  return (
   <div className="home-container">

    <div className="home-header">
      <h1>Welcome to Task Manager</h1>
        <p>Manage your tasks efficiently and stay organized with our Task Manager app.</p>
      </div>

      <div className="stats-container">
        <div className="stat-card">
        <h3>Total Tasks</h3>
        <p className="stat-number">12</p>
      </div>

      <div className="stat-card">
        <h3>Completed</h3>
        <p className="stat-number i1n ">5</p>
      </div>

      <div className="stat-card">
        <h3>Pending</h3>
        <p className="stat-number pending">7</p>
      </div>

      </div>

      <div className="home-action">
        <button className="view-tasks-button" onClick={() => navigate("/tasks")}>View All Tasks</button>
      </div>
   </div>
  );
}
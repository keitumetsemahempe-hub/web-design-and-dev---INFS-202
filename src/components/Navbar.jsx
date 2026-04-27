import { Link } from "react-router-dom";
import { FiSearch, FiBell } from "react-icons/fi";
import "./navbar.css";

export default function Navbar() {
return (
    <nav className="navbar">
        <div className="nav-left">
            <h2 className="logo">Workspace</h2>
        </div>

        <div className="nav-center">
            <div className="search-box">
                <FiSearch />
                <input type="text" placeholder="Search tasks..." />
            </div>
        </div>

        <div className="nav-right">

            <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/tasks">Tasks</Link>
            <Link to="/login">Login</Link>
            </div>

            <div className="nav-actions">
            <Link to="/add-task" className="add-btn"> + New</Link>

            <FiBell className="notification-icon" />

            <img 
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="avatar"
            />
            </div>
        </div>
    </nav>
);
}               
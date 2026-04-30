import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiBell } from "react-icons/fi";
import "./navbar.css";
import { useEffect, useState } from "react";

export default function Navbar() {

    
    const navigate = useNavigate();

    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        const handleStorageChange = () => {
            setToken(localStorage.getItem("token"));
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    function logout() {
        localStorage.removeItem("token");

        setToken(null);
        navigate("/login");
    }

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
            {!token && <Link to="/login">Login</Link>}
            </div>

            <div className="nav-actions">

            {token && (
                <Link to="/add-task" className="add-btn"> + New</Link>
            )}
            <FiBell className="notification-icon" />

            <img 
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="avatar"
            />
             {token && (
                <button onClick={logout} className="logout-btn">
                logout
                </button>
             )}

            </div>
        </div>
    </nav>
);
}               
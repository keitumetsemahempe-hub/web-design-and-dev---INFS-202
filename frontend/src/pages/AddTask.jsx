import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./addtask.css";

const API = "http://localhost:5000/api";

export default function AddTask({ setReload }) {
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (title.trim() ==="") {
            setError("Title is required");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const res = await fetch(`${API}/tasks`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`               
                 },
                 body: JSON.stringify({
                    title,
                    description: ""
                 })
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Failed to add task");
                return;
            }
            setReload(prev => !prev);

            setTitle("");
        setError("");

        setTimeout(() => {
            navigate("/tasks");
        }, 50);
        
        } catch (err) {
            console.error(err);
            alert("Server error");
        }
      
       
    }

    return (
        <div className="add-container">
            <div className="add-card">
                <h2>Add New Task</h2>

                <form onSubmit={handleSubmit} className="add-form">

                    <input 
                    placeholder="Enter task..."
                    value={title}
                    onChange={(e)=>{
                        setTitle(e.target.value);
                        setError("");
                    }}
                    />

                    {error && <p className="error-text">{error}</p>}

                    <div className="add-actions">

                        <button type="submit" className="create-btn">
                            Add Task
                        </button>

                        <button 
                        type="button"
                        className="cancel-btn"
                        onClick={() => navigate(-1)}
                        >
                            Cancel
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );

       
}
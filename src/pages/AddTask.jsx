import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./addtask.css";

export default function AddTask({ tasks,setTasks }) {
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        if (title.trim() ==="") {
            setError("Title is required");
            return;
        }

        const newTask = {
            id: Date.now(),
            title: title,
            completed: false,
        };

        setTasks([...tasks, newTask]);
        setTitle("");
        setError("")
        navigate("/tasks");
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
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./edittask.css";



export default function EditTask({ tasks, setTasks }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const task = tasks.find((t) => t.id === Number(id));

    const [title, setTitle] = useState("");

    useEffect(() => {
        if (task) {
            setTitle(task.title);
        }
    }, [task]);

    function handleSubmit(e) {
        e.preventDefault();

        if (title.trim() === "") {
            return;
        }

        const updatedTask = tasks.map(t => 
            t.id === Number(id)
                ? { ...t, title }
                : t
        );
        setTasks(updatedTask);
        navigate("/tasks");
    }

    if (!task) {
        return <h2>Task not found</h2>;
    }

    return (
        <div className="edit-container">
        <div className="edit-card">
            <h2>Edit Task</h2>
            <form onSubmit={handleSubmit} className="edit-form">
                <input 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Edit task title"
                />

                <div className="edit-actions">
                <button type="submit" className="save-btn">Save</button>
                <button type="button" className="cancel-btn"
                onClick={() => navigate(-1)}>
                    cancel
                </button>
                </div>
            </form>
        </div>    
        </div>      
    ) ;
}


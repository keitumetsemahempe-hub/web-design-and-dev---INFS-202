import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./edittask.css";

const API = "https://web-design-and-dev-infs-202.onrender.com/api";

export default function EditTask({ tasks, setTasks, setReload }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const task = tasks?.find((t) => t.task_id === Number(id));

    const [title, setTitle] = useState("");

    useEffect(() => {
        if (task?.title) {
            setTitle(task.title);
        }
    }, [task]);

    async function handleSubmit(e) {
        e.preventDefault();

        if (title.trim() === "") {
            return;
        }

        try {
            const token = localStorage.getItem("token");
        

        const res = await fetch(`${API}/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                title,
                description: task?.description || "",
                status: task?.status || "pending"
            })
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message || "Failed to update task");
        return ;
    }

    setReload(prev => !prev);

    navigate("/tasks");

    }catch (err) {
        console.error(err);
        alert("Server error");
    }
}
if (!tasks || tasks.length === 0) {
    return <h2>Loading...</h2>
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


import { Link } from "react-router-dom";
import "./tasks.css";

import { FiCheck, FiX, FiEye, FiEdit, FiTrash } from "react-icons/fi";
import { useEffect } from "react";

const API = "http://localhost:5000/api";

export default function Tasks({ tasks, setTasks }) {

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch(`${API}/tasks`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => setTasks(data))
        .catch(err => console.error(err));
    }, [setTasks]);

    function toggleStatus(task) {
        const token = localStorage.getItem("token");

        const newStatus = task.status === "done" ? "pending" : "done";

        fetch(`${API}/tasks/${task.task_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                title: task.title,
                description: task.description,
                status: newStatus
            })
        })
        .then(() => {
            
            setTasks(tasks.map(t =>
                t.task_id === task.task_id
                    ? { ...t, status: newStatus }
                    : t
            ));
        });
    }

    function deleteTask(id) {
        const token = localStorage.getItem("token");
        
        fetch(`${API}/tasks/${id}` , {
            method: "DELETE",
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            setTasks(tasks.filter(task => task.task_id !== id));
        });
    }

    return (
       <div className="tasks-container">
        <h2 className="tasks-title">Task List</h2>

        <div className="tasks-grid">

            {tasks.map(task => (
                <div key={task.task_id} className="task-card">

                    <h3 className={ task.status === "done" ? "completed" : "" }>{task.title}</h3>

                    <div className="task-actions">
                       <button 
                          onClick={() => toggleStatus(task) }
                           className="icon-btn">
                            {task.status === "done" ? <FiX /> : <FiCheck />}
                           </button>

                        <Link to={`/tasks/${task.task_id}`} className="icon-btn">
                            <FiEye />
                        </Link>

                        <Link to={`/edit/${task.task_id}`} className="icon-btn">
                            <FiEdit />
                        </Link>

                        <button 
                        onClick={() => deleteTask(task.task_id)}
                        className="icon-btn delete"
                        >
                            <FiTrash />
                        </button>
                    </div>
                </div>
            ))}
        </div>
       </div>
    );
}

const card = {
    border: "1px solid #f5f5f5",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
};


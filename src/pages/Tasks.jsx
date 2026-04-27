import { Link } from "react-router-dom";
import "./tasks.css";

import { FiCheck, FiX, FiEye, FiEdit, FiTrash } from "react-icons/fi";

export default function Tasks({ tasks, setTasks }) {

    function toggleTask(id) {
        setTasks(
            tasks.map(task =>
                task.id === id 
                 ? { ...task, completed: !task.completed }
                     : task
            )
        );
    }

    function deleteTask(id) {
        setTasks(tasks.filter(task => task.id !== id));
    }

    return (
       <div className="tasks-container">
        <h2 className="tasks-title">Task List</h2>

        <div className="tasks-grid">

            {tasks.map(task => (
                <div key={task.id} className="task-card">

                    <h3 className={ task.completed ? "completed" : "" }>{task.title}</h3>

                    <div className="task-actions">
                        <button onClick={() => toggleTask(task.id)} className="icon-btn" >
                            { task.completed ? <FiX /> : <FiCheck /> }
                        </button>

                        <Link to={`/tasks/${task.id}`} className="icon-btn">
                            <FiEye />
                        </Link>

                        <Link to={`/edit/${task.id}`} className="icon-btn">
                            <FiEdit />
                        </Link>

                        <button 
                        onClick={() => deleteTask(task.id)}
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


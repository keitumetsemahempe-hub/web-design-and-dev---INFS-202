import { useNavigate, useParams } from "react-router-dom";
import "./TaskDetails.css";


export default function TaskDetails({ tasks }) {

    const { id } = useParams();
    const navigate = useNavigate();

    const task = tasks.find(t => t.task_id === Number(id));

    if (!task) {
        return  <h2 style={{ color: "white", textAlign: "center" }} >Task not found  </h2>
    }
    
    return (
        <div className="details-page">
           <div className="details-card">
            <div className="details-header">
            
            <h2>{task.title}</h2>

            
                
                <span className={ task.status === "done" ? "badge done" : "badge pending" }>{ task.status === "done" ? "Completed" : "Pending" }</span>  
            </div>

            <p className="subtext">
                Task ID: {task.task_id} 
            </p>

            <div className="details-actions">

            <button className="back-btn" onClick={() => navigate(-1)}>
                Back
            </button>

            <button className="primary-btn"
            onClick={() => navigate (`/edit/${task.task_id}`)}
            >
                Edit Task
            </button>
            
            </div>
           </div>
        </div>

    );

}               
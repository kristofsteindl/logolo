import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Task extends Component {
    render() {
        const task = this.props.task;
        let priorityString;
        let priorityClass;
        
        if(task.priority===1) {
            priorityClass = "bg-danger text-light";
            priorityString = "High";
        } else if (task.priority===2) {
            priorityClass = "bg-warning text-light";
            priorityString = "Medium";
        } else if (task.priority===3) {
            priorityClass = "bg-info text-light";
            priorityString = "Low";  
        }
        return (
            <div className="card mb-1 bg-light">
                <div className={`card-header text-primary ${priorityClass}`}>
                    key: {task.projectSequence} -- Priority: {priorityString}
                </div>
                <div className="card-body bg-light">
                    <h5 className="card-title">{task.summary}</h5>
                    <p className="card-text text-truncate ">
                        {task.acceptanceCriteria}
                    </p>
                    
                    <Link to={`/updateTask/${task.projectKey}/${task.projectSequence}`} className="btn btn-primary">
                        View / Update
                    </Link>
                    
                    <button className="btn btn-danger ml-4">
                        Delete
                    </button>
                </div>
            </div>
        )
    }
}

export default Task;

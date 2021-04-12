import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { deleteTask } from '../../actions/backlogActions';
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Task extends Component {
    onDeleteClick(projectKey, projectSequence) {
        this.props.deleteTask(projectKey, projectSequence);
    }
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
                    
                    <button 
                        onClick={this.onDeleteClick.bind(this, task.projectKey, task.projectSequence)} 
                        className="btn btn-danger ml-4">
                        Delete
                    </button>
                </div>
            </div>
        )
    }
}

Task.propTpes = {
    deleteTask: PropTypes.func.isRequired
}

export default connect (null, {deleteTask} )(Task);

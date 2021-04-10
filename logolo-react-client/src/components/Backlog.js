import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Task from './tasks/Task';

class Backlog extends Component {
    render() {
        const { tasks } = this.props;

        let toDoComponents = tasks.filter(task => task.status === "TO_DO").map(task => (<Task task={task}/>));
        let inPropgressComponents = tasks.filter(task => task.status === "IN_PROGRESS").map(task => (<Task task={task}/>));
        let doneComponents = tasks.filter(task => task.status === "DONE").map(task => (<Task task={task}/>));


        return (
            <div className="container">
            <div className="row">
                <div className="col-md-4">

                    <div className="card text-center mb-2">
                        <div className="card-header text-white bg-secondary">
                            <h3>TO DO</h3>
                        </div>
                    </div>
                    {toDoComponents}
                </div>
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-primary text-white">
                            <h3>In Progress</h3>
                        </div>
                    </div>
                    {inPropgressComponents}
                </div>
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-success text-white">
                            <h3>Done</h3>
                        </div>
                    </div>
                    {doneComponents}
                </div>
            </div>
        </div>
        )
    }
}

export default Backlog;

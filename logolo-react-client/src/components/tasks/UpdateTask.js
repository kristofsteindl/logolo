import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import classnames from "classnames";
import { getTask } from '../../actions/backlogActions';
import { getProject } from '../../actions/projectActions';
import PropTypes from "prop-types";

class UpdateTask extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            foo: "bar",
            task: {
                summary: "",
                projectSequence: "",
                priority: "",
                status: "",
                acceptanceCriteria: "",
                dueDate: ""
            },
            project: {
                projectName: ""
            }
        };
        
    }




    componentWillReceiveProps(nextProps) {
        console.log("nextProps");
        console.log(nextProps);
        /*
        this.setState({
            task: nextProps.task,
            project: nextProps.project
        });
        */
    }
    handleChange(event) {
        console.log("hello");
        console.log(event.target.name);
        console.log(event.target.value);
        this.setState({value: event.target.value});
    }

    componentDidMount(){
        const { projectKey, projectSequence } = this.props.match.params;
        this.props.getProject(projectKey, this.props.history);
        this.props.getTask(projectKey, projectSequence, this.props.history);
    }


    render() {
        return (
            <div className="add-PBI">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="" className="btn btn-light">
                                Back to Project Board
                            </Link>
                            <h4 className="display-4 text-center">Update Project Task</h4>
                            <p className="lead text-center">Project Name: {this.state.project.projectName}, Project Key: {this.state.task.projectSequence}</p>
                            <form>
                            <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                name="summary" 
                                placeholder="Project Task summary" 
                                value={this.state.task.summary}
                                onChange={(this.handleChange)}
                            />
                                
                        </div>
                        <div className="form-group">
                            <textarea 
                                className="form-control form-control-lg" 
                                placeholder="Acceptance Criteria" 
                                name="acceptanceCriteria"
                                value={this.state.task.acceptanceCriteria}
                                onChange={this.handleChange}
                            />
                        </div>
                        <h6>Due Date</h6>
                        <div className="form-group">
                            <input 
                                type="date" 
                                className="form-control form-control-lg" 
                                name="dueDate" 
                                value={this.state.task.dueDate}
                                onChange={this.handleChange}
                            />
                        </div>
                                <div className="form-group">
                                    <select 
                                        className="form-control form-control-lg" 
                                        name="priority"
                                        value={this.state.task.priority}
                                        onChange={this.handleChange}
                                    >
                                        
                                        <option value={0}>Select Priority</option>
                                        <option value={1}>High</option>
                                        <option value={2}>Medium</option>
                                        <option value={3}>Low</option>
                                    </select>
                                </div>
        
                                <div className="form-group">
                                    <select 
                                        className="form-control form-control-lg" 
                                        name="status"
                                        value={this.state.task.status}
                                        onChange={this.handleChange}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="TO_DO">TO DO</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
                                </div>
        
                                <input type="submit" className="btn btn-primary btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

UpdateTask.prototypes = {
    getTask: PropTypes.func.isRequired,
    task: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    task: state.backlog.task,
    project: state.project.project
})


export default connect (mapStateToProps, {getTask, getProject })(UpdateTask);

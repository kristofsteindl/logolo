import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import classnames from 'classnames';
import { addTask } from "../../actions/backlogActions";
import PropTypes from "prop-types";

class AddTask extends Component {
    constructor(props){
        super(props);
        this.state = {
            summary: "",
            acceptanceCriteria: "",
            status: "",
            priority: 0,
            dueDate: "",
            errors: {}
            
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }
    // lifecycle hooks
    // TODO componentWillReceiveProps is depricated MUST refactor!!!
    // https://medium.com/hackernoon/replacing-componentwillreceiveprops-with-getderivedstatefromprops-c3956f7ce607#:~:text=getDerivedStateFromProps%20is%20one%20of%20those,when%20it%20receives%20new%20props.
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }
    onChange(e) {
        this.setState({[e.target.name]:e.target.value});
    }
    onSubmit(e) {
        e.preventDefault();
        const taskInput = {
            "projectKey": this.props.match.params.projectKey,
            "summary": this.state.summary,
            "acceptanceCriteria":this.state.acceptanceCriteria,
            "status": this.state.status,
            "priority": this.state.priority,
            "dueDate": this.state.dueDateummary,
        };
        this.props.addTask(taskInput, this.props.history);
    }
    render() {
        console.log(this);
        const projectKey = this.props.match.params;
        const {errors} = this.state;
        return (
            <div className="add-PBI">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Link to={`/projectBoard/${projectKey}`} className="btn btn-light">
                            Back to Project Board
                        </Link>
                        <h4 className="display-4 text-center">Add Task</h4>
                        <p className="lead text-center">Project Name + Project Code</p>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    className={classnames("form-control form-control-lg", {"is-invalid":errors.summary})} 
                                    name="summary" 
                                    placeholder="Project Task summary" 
                                    value={this.state.summary}
                                    onChange={this.onChange}
                                />
                                {
                                    errors.summary && (<div className="invalid-feedback">{errors.summary}</div>)
                                }
                            </div>
                            <div className="form-group">
                                <textarea 
                                    className="form-control form-control-lg" 
                                    placeholder="Acceptance Criteria" 
                                    name="acceptanceCriteria"
                                    value={this.state.acceptanceCriteria}
                                    onChange={this.onChange}
                                >
                                </textarea>
                            </div>
                            <h6>Due Date</h6>
                            <div className="form-group">
                                <input 
                                    type="date" 
                                    className="form-control form-control-lg" 
                                    name="dueDate" 
                                    value={this.state.dueDate}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <select 
                                    className="form-control form-control-lg" 
                                    name="priority"
                                    value={this.state.priority}
                                    onChange={this.onChange}
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
                                    value={this.state.status}
                                    onChange={this.onChange}
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

AddTask.propTypes = {
    addTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(mapStateToProps, { addTask })(AddTask);

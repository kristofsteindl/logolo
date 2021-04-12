import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { getTask, updateTask } from "../../actions/backlogActions";
import { getProject } from '../../actions/projectActions';
import { clearErrors } from '../../actions/commonActions';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class UpdateTask extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      projectSequence: "",
      summary: "",
      acceptanceCriteria: "",
      status: "",
      priority: "",
      dueDate: "",
      projectKey: "",
      errors: {},
      project: {
        projectName: ""
     }
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { projectKey, projectSequence } = this.props.match.params;
    this.props.getTask(projectKey, projectSequence, this.props.history);
    this.props.getProject(projectKey, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
    const {
      id,
      projectSequence,
      summary,
      acceptanceCriteria,
      status,
      priority,
      dueDate,
      projectKey
    } = nextProps.task;

    this.setState({
      id,
      projectSequence,
      summary,
      acceptanceCriteria,
      status,
      priority,
      dueDate,
      projectKey,
      project: nextProps.project
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
      e.preventDefault();
      const taskInput = {
        summary: this.state.summary,
        acceptanceCriteria: this.state.acceptanceCriteria,
        status: this.state.status,
        priority: this.state.priority,
        dueDate: this.state.dueDate,
        projectKey: this.state.project.projectKey
      }
      this.props.updateTask(
        this.state.projectKey, 
        this.state.projectSequence, 
        taskInput, 
        this.props.history);
  }

  componentWillUnmount() {
    console.log("Component will unmount");
    this.props.clearErrors();
}

  render() {
    const errors = this.state.errors;
    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/projectBoard/${this.state.projectKey}`} className="btn btn-light">
                Back to Project Board
              </Link>
              <h4 className="display-4 text-center">Update Project Task</h4>
              <p className="lead text-center">
                Project Name: {this.state.project.projectName} | Project Task ID:{" "}
                {this.state.projectSequence}{" "}
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {"is-invalid": errors.summary})}
                    name="summary"
                    placeholder="Project Task summary"
                    value={this.state.summary}
                    onChange={this.onChange}
                  />
                  {
                    errors.summary && (
                      <div className="invalid-feedback">{errors.summary}</div>
                    )
                  }
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Acceptance Criteria"
                    name="acceptanceCriteria"
                    value={this.state.acceptanceCriteria}
                    onChange={this.onChange}
                  />
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

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateTask.propTypes = {
    getTask: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
    task: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired

};

const mapStateToProps = state => ({
    task: state.backlog.task,
    project: state.project.project,
    errors: state.errors
});

export default connect(
  mapStateToProps,
  { getTask, getProject, updateTask, clearErrors }
)(UpdateTask);
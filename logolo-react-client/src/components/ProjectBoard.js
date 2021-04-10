import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Backlog from './Backlog';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBacklog } from "../actions/backlogActions"; 

class ProjectBoard extends Component {
    constructor() {
        super();
        this.state = {
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors})
        }
    }

    componentDidMount() {
        const { projectKey } = this.props.match.params;
        this.props.getBacklog(projectKey);
    }

    getBoardContent() {
        const tasks = this.props.backlog.tasks;
        const errors = this.state.errors;
        if (errors.projectNotFound) {
            return (
                <div className="alert alert-danger text-center" role="alert">{errors.projectNotFound}</div>
            )
        } else if (tasks.length < 1) {
            return <div className="alert alert-info text-center" role="alert">No tasks on this board (in this project)</div>
        } else {
            return <Backlog tasks={tasks}/>
        }
    }

    render() {
        const projectKey = this.props.match.params.projectKey;
        return (
            <div className="container">
            <Link to={`/addTask/${projectKey}`} className="btn btn-primary mb-3">
                <i className="fas fa-plus-circle"> Create Task</i>
            </Link>
            <br />
            <hr />
            {this.getBoardContent()}
        </div>
        );
    }
}

ProjectBoard.protoTypes = {
    backlog: PropTypes.object.isRequired,
    getBacklog: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    backlog: state.backlog,
    errors: state.errors
});

export default connect(mapStateToProps, {getBacklog})(ProjectBoard);

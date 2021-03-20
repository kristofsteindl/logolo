import React, { Component } from "react";
import { getProject, updateProject } from "../../actions/projectActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

class UpdateProject extends Component {
    constructor(){
        super()
        this.state = {
            id:"",
            projectName: "",
            projectKey: "",
            description: "",
            startDate: "",
            endDate: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    componentWillReceiveProps(nextProps){
        const { id,
            projectName,
            projectKey,
            description,
            startDate,
            endDate} = nextProps.project;
        this.setState({ id,
            projectName,
            projectKey,
            description,
            startDate,
            endDate});
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getProject(id, this.props.history);
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        const projectToBeUpdated = {
            projectName: this.state.projectName,
            description: this.state.description,
            startDate: this.state.startDate,
            endDate: this.state.endDate
        }
        this.props.updateProject(this.state.id, projectToBeUpdated, this.props.history);
    }

    render() {
        return (
            <div className="project">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h5 className="display-4 text-center">Create / Edit Project form</h5>
                        <hr />
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control form-control-lg " 
                                    placeholder="Project Name" 
                                    name="projectName"
                                    value={this.state.projectName}
                                    onChange={this.onChange}
                                    />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control form-control-lg" 
                                    placeholder="Unique Project ID"
                                    name="projectKey"
                                    disabled 
                                    value={this.state.projectKey}
                                    />
                            </div>
                            <div className="form-group">
                                <textarea 
                                    className="form-control form-control-lg" 
                                    placeholder="Project Description"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    >
                                </textarea>
                            </div>
                            <h6>Start Date</h6>
                            <div className="form-group">
                                <input 
                                    type="date" 
                                    className="form-control form-control-lg" 
                                    name="startDate" 
                                    value={this.state.startDate}
                                    onChange={this.onChange}
                                    />
                            </div>
                            <h6>Estimated End Date</h6>
                            <div className="form-group">
                                <input 
                                    type="date" 
                                    className="form-control form-control-lg" 
                                    name="endDate" 
                                    value={this.state.endDate}
                                    onChange={this.onChange}
                                    />
                            </div>
    
                            <input type="submit" className="btn btn-primary btn-block mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
        )
    }
};

UpdateProject.propTypes = {
    getProject: PropTypes.func.isRequired,
    updateProject: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired

};

const mapStateToProps = state => ({
    project:state.project.project
});

export default connect(mapStateToProps, {getProject, updateProject})(UpdateProject);

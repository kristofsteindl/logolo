import React, { Component } from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {createProject} from "../../actions/projectActions"
 
class AddProject extends Component {
    constructor() {
        super()
        this.state = {
            projectName: "",
            projectKey: "",
            description: "",
            startDate: "",
            endDate: "",
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
        const newProject = {
            "projectName": this.state.projectName,
            "projectKey": this.state.projectKey,
            "description": this.state.description,
            "startDate": this.state.startDate,
            "endDate": this.state.endDate
        };
        this.props.createProject(newProject, this.props.history);
    }
    render() {
        const {errors} = this.state
        
        return (
            <div>
            
                <div className="project">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h5 className="display-4 text-center">Create Project form</h5>
                                <hr />
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input 
                                            name="projectName" 
                                            value={this.state.projectName}
                                            type="text" 
                                            className="form-control form-control-lg " 
                                            placeholder="Project Name" 
                                            onChange={this.onChange}
                                            />
                                            <p>{errors.projectName}</p>
                                    </div>
                                    <div className="form-group">
                                        <input 
                                            name="projectKey" 
                                            value={this.state.projectKey}
                                            type="text" 
                                            className="form-control form-control-lg" 
                                            placeholder="Unique Project Key"
                                            onChange={this.onChange}
                                            />
                                            <p>{errors.projectKey}</p>
                                    </div>
                        
                                    <div className="form-group">
                                        <textarea 
                                            name="description" 
                                            value={this.state.description}
                                            className="form-control form-control-lg" 
                                            placeholder="Project Description"
                                            onChange={this.onChange}></textarea>
                                            <p>{errors.description}</p>
                                    </div>
                                    <h6>Start Date</h6>
                                    <div className="form-group">
                                        <input 
                                            name="startDate"
                                            value={this.state.startDate}
                                            type="date" 
                                            className="form-control form-control-lg" 
                                            onChange={this.onChange}
                                             />
                                    </div>
                                    <h6>Estimated End Date</h6>
                                    <div className="form-group">
                                        <input 
                                            name="endDate"
                                            value={this.state.endDate}
                                            type="date" 
                                            className="form-control form-control-lg" 
                                            onChange={this.onChange}
                                            />
                                    </div>
            
                                    <input type="submit" className="btn btn-primary btn-block mt-4" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddProject.propTypes = {
    createProject: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(mapStateToProps, {createProject}) (AddProject);

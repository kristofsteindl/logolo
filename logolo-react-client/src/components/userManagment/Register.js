import React, { Component } from 'react';
import { connect } from "react-redux";
import { registerNewUser } from "../../actions/securityActions";
import { clearErrors } from "../../actions/commonActions";
import PropTypes from "prop-types";
import classnames from "classnames";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}

        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        if(this.props.security.user) {
            this.props.history.push("/")
        }
    }

    onChange(e) {
        this.setState({[e.target.name]:e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const newUserInput = {
            "fullName": this.state.name,
            "username": this.state.email,
            "password": this.state.password,
            "confirmPassword": this.state.password2

        }
        this.props.registerNewUser(newUserInput, this.props.history);

    }

    componentWillReceiveProps(nextProps){
        this.setState({errors: nextProps.errors});
    }

    render() {
        const {errors} = this.state;
        return (
            
            <div className="register">
                <div className="container">
                <div className="invalid-feedback">
               
                </div>
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <div className="invalid-feedback">
                            </div>
                            <p className="lead text-center">Create your Account</p>
                            {errors.message && (
                                <h6 className="display-10 text-center red" style={{color: "red"}}>{errors.message}</h6>
                            )}
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        className={classnames("form-control form-control-lg",
                                        {"is-invalid":errors.fullName})}
                                        placeholder="Full Name" 
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChange}
                                 
                                    />
                                    <div className="invalid-feedback">{errors.message}</div>
                                    {errors.fullName && (
                                        <div className="invalid-feedback">{errors.fullName}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="text"
                                        className={classnames("form-control form-control-lg",
                                        {"is-invalid":errors.username})}
                                        placeholder="Email Address" 
                                        name="email" 
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                                    {errors.username && (
                                        <div className="invalid-feedback">{errors.username}</div>
                                    )}
        
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="password" 
                                        className={classnames("form-control form-control-lg",
                                        {"is-invalid":errors.password})}
                                        placeholder="Password" 
                                        name="password" 
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                    {errors.password && (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="password" 
                                        className={classnames("form-control form-control-lg",
                                        {"is-invalid":errors.confirmPassword})}
                                        placeholder="Confirm Password"
                                        name="password2" 
                                        value={this.state.password2}
                                        onChange={this.onChange}
                                    />
                                    {errors.confirmPassword && (
                                        <div className="invalid-feedback">{errors.confirmPassword}</div>
                                    )}
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    registerNewUser: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired

};


const mapStateToProps = state => ({
    errors: state.errors,
    security: state.security
});

export default connect(mapStateToProps, { registerNewUser, clearErrors })(Register);

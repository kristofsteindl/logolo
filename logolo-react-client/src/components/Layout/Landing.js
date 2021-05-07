import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Landing extends Component {
    
    render() {
        const user = this.props.security.user;
        const loggedIn = user && JSON.stringify(user) !== '{}';
        const loggedInOptions = (
            <div>
                <Link to="/logout" className="btn btn-lg btn-secondary mr-2">
                    Logout
                </Link>
            </div>
        );
        const loggedOutOptions = (
            <div>
                <Link to="/register" className="btn btn-lg btn-primary mr-2">
                    Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-secondary mr-2">
                    Login
                </Link>
            </div>
        );
        return (
            <div className="landing">
                <div className="light-overlay landing-inner text-dark">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 className="display-3 mb-4">Logolo, task tracking with workhour loging</h1>
                                <p className="lead">
                                    Create your account to join active projects or start you own
                                </p>
                                <hr />
                                {loggedIn ? loggedInOptions : loggedOutOptions}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Landing.propTypes = {
    security: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    security: state.security
});

export default connect(mapStateToProps) (Landing); 

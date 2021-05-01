import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Landing extends Component {
    render() {
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

                                <Link className="btn btn-lg btn-primary mr-2" to="/register">
                                    Sign Up
                                </Link>
                                <a href="login.html" className="btn btn-lg btn-secondary mr-2">
                                    Login
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing; 

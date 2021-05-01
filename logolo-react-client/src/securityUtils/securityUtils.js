import axios from "axios";
import jwt_decode from "jwt-decode";
import store from '../store';
import { SET_CURRENT_USER } from "../actions/types";

export const setJwt = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

export const refreshAuthentication = () => {
    const jwtToken = localStorage.jwtToken;

    if (jwtToken) {
    setJwt(jwtToken);
    const decoded = jwt_decode(jwtToken);
    store.dispatch({
        type: SET_CURRENT_USER,
        payload: decoded
    });
    const currentTime = Date.now()/1000;
    if (decoded.exp < currentTime) {
        // handle logout
        // window.location.href="/";
    }
    }
}

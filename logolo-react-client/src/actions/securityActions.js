import axios from "axios";
import { setJwt, refreshAuthentication } from "../securityUtils/securityUtils";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import jwt_decode from "jwt-decode";

export const registerNewUser = (newUserInput, history) => async dispatch => {
    try {
        await axios.post('/api/users/register/', newUserInput);
        history.push('/login');
    } catch (error) {
        dispatch({
            type:GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const login = (loginRequest, history) => async dispatch => {
    try {
        const result = await axios.post("/api/users/login", loginRequest);
        const token = result.data.token;
        localStorage.setItem("jwtToken", token);
        refreshAuthentication();
    } catch (error) {
        dispatch({
            type:GET_ERRORS,
            payload: error.response.data
        });
        
    }

};
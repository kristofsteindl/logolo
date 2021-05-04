import axios from "axios";
import { setJwt, refreshTokenAndUser } from "../securityUtils/securityUtils";
import { GET_ERRORS } from "./types";

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
        refreshTokenAndUser();
    } catch (error) {
        dispatch({
            type:GET_ERRORS,
            payload: error.response.data
        });   
    }
};


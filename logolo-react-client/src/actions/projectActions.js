import axios from "axios"
import { GET_ERRORS, GET_PROJECT, GET_PROJECTS, DELETE_PROJECT } from "./types";

export const createProject = (project, history) => async dispatch => {
    try {
        await axios.post("/api/project/", project);
        history.push("/dashboard");
        dispatch({
            type:GET_ERRORS,
            payload: {}
        });
    } catch (err) {
        dispatch({
            type:GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const getProjects = () => async dispatch => {
    const res = await axios.get("/api/project/all");
    dispatch({
        type: GET_PROJECTS,
        payload: res.data
    })
};

export const getProject = (id, history) => async dispatch => {
    try {
        const res = await axios.get(`/api/project/${id}`);
        dispatch({
            type: GET_PROJECT,
            payload: res.data
        })
    } catch (error) {
        history.push("/dashboard");
    }

}

export const updateProject = (id, project, history) => async dispatch => {
    try {
        await axios.put(`/api/project/${id}`, project);
        history.push("/dashboard");
    } catch (err) {
        dispatch({
            type:GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const deleteProject =  projectKey => async dispatch => {
    if (window.confirm("Are you sure to delete the WHOLE project with ALL of its data?")) {
        await axios.delete(`/api/project/${projectKey}`);
        dispatch({
            type:DELETE_PROJECT,
            payload: projectKey
        });
    }
}
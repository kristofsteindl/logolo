import axios from "axios";
import { GET_ERRORS, GET_BACKLOG, GET_TASK, DELETE_TASK } from "./types";

export const addTask = (taskInput, history) => async dispatch => {
    try {
        await axios.post(`/api/backlog/`, taskInput);
        history.push(`/projectBoard/${taskInput.projectKey}`);
    } catch (error) {
        dispatch({
            type:GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const getBacklog = projectKey => async dispatch => {
    try {
        const res = await axios.get(`/api/backlog/${projectKey}`);
        dispatch({
            type: GET_BACKLOG,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type:GET_ERRORS,
            payload: error.response.data
        });
    }
} 

export const getTask = (projectKey, projectSequence, history) => async dispatch => {
    try {
        const res = await axios.get(`/api/backlog/${projectKey}/${projectSequence}`);
        dispatch({
            type: GET_TASK,
            payload: res.data
        });
    } catch (error) {
        history.push("/dashboard");
    }
}

export const updateTask = (projectKey, projectSequence, taskInput, history) => async dispatch => {
    try {
        await axios.put(`/api/backlog/${projectKey}/${projectSequence}`, taskInput);
        history.push(`/projectBoard/${projectKey}`);
    } catch (error) {
        dispatch({
            type:GET_ERRORS,
            payload: error.response.data
        });
    }
}

export const deleteTask = (projectKey, projectSequence) => async dispatch => {
    if (window.confirm(`You are deleting ${projectSequence} task. Are you sure?`)) {
        await axios.delete(`/api/backlog/${projectKey}/${projectSequence}`);
        dispatch({
            type: DELETE_TASK,
            payload: projectSequence
        })
    }
}
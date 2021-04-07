import axios from "axios";

export const addTask = (taskInput, history) => async dispatch => {
    
    await axios.post(`/api/backlog/`, taskInput);
    history.push(`/projectBoard/${taskInput.projectKey}`);

};

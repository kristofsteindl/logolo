//import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard';
import Header from './components/Layout/Header';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import UpdateProject from './components/Project/UpdateProject';
import {Provider} from "react-redux";
import store from './store';
import ProjectBoard from './components/ProjectBoard';
import AddTask from './components/tasks/AddTask';
import UpdateTask from './components/tasks/UpdateTask';
import Landing from './components/Layout/Landing';
import Register from './components/userManagment/Register';
import Login from './components/userManagment/Login';
import { setJwt, logout, refreshTokenAndUser } from "./securityUtils/securityUtils";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER } from "./actions/types";

console.log("App.js code is running")
const jwtToken = localStorage.jwtToken;
if (jwtToken) {
  setJwt(jwtToken);
  const decodedToken = jwt_decode(jwtToken);
  store.dispatch({
      type: SET_CURRENT_USER,
      payload: decodedToken
  });

  const currentTime = Date.now()/1000;
  console.log(decodedToken);
  console.log(decodedToken.exp);
  console.log(currentTime);
  if (decodedToken.exp < currentTime) {
    console.log("token expired");  
    store.dispatch(logout());
    window.location.replace("/");
  }
}


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          {
            //Public Routes
          }

          {
            //Private Routes
          }
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
         

          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/addProject" component={AddProject} />
          <Route exact path="/updateProject/:id" component={UpdateProject} />
          <Route exact path="/projectBoard/:projectKey" component={ProjectBoard} />
          <Route exact path="/addTask/:projectKey" component={AddTask} />
          <Route exact path="/updateTask/:projectKey/:projectSequence" component={UpdateTask} />
        </div>
      </Router>
    </Provider>

  );
}

export default App;

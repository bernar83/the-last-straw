import React, { Component } from "react";
import { Router, Route } from "react-router-dom";

import "./App.css";
import history from "./utils/history";

import Landing from "./components/Landing";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import isEmpty from "./utils/is-empty.js";

class App extends Component {
  state = {
    user: {},
    isAuthenticated: false
  };

  setCurrentUser = decoded => {
    this.setState({ user: decoded, isAuthenticated: !isEmpty(decoded) });
  };

  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route
            exact
            path="/login"
            render={props => (
              <Login
                {...props}
                user={this.state.user}
                isAuthenticated={this.state.isAuthenticated}
                setCurrentUser={this.setCurrentUser}
              />
            )}
          />
          <Route
            exact
            path="/profile"
            render={props => (
              <Profile
                {...props}
                user={this.state.user}
                isAuthenticated={this.state.isAuthenticated}
                setCurrentUser={this.setCurrentUser}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;

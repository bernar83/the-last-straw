import React, { Component } from "react";

import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import Navbar from "./Navbar";

class Profile extends Component {
  componentDidMount() {
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);

      const decoded = jwt_decode(localStorage.jwtToken);

      this.props.setCurrentUser(decoded);
    }
  }

  render() {
    return (
      <div>
        <Navbar setCurrentUser={this.props.setCurrentUser} />
        <h1>hello profile</h1>
      </div>
    );
  }
}

export default Profile;

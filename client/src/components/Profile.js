import React, { Component } from "react";

import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

class Profile extends Component {
  componentDidMount() {
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);

      const decoded = jwt_decode(localStorage.jwtToken);

      this.props.setCurrentUser(decoded);
    }
  }

  render() {
    return <h1>hello profile</h1>;
  }
}

export default Profile;

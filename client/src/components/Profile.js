import React, { Component } from "react";

import Entry from "./Entry";

import Navbar from "./Navbar";
class Profile extends Component {
  componentWillMount() {
    if (!this.props.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      <div>
        <Navbar setCurrentUser={this.props.setCurrentUser} />
        <Entry />
      </div>
    );
  }
}

export default Profile;

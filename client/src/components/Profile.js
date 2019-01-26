import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";

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
        <Navbar
          setCurrentUser={this.props.setCurrentUser}
          destination={"history"}
        />
        <Typography variant="h2" align="center" gutterBottom>
          Profile
        </Typography>
        <Entry />
      </div>
    );
  }
}

export default Profile;

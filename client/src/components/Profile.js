import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

import Entry from "./Entry";
import Navbar from "./Navbar";
import History from "./History";

class Profile extends Component {
  state = {
    entries: [],
    isLoading: true
  };

  componentWillMount() {
    axios
      .get("/profile")
      .then(res => this.props.setCurrentUser(res.data))
      .catch(err => this.props.history.push("/login"));
  }

  componentDidMount() {
    axios
      .get("/history")
      .then(res => {
        this.setState({ entries: res.data, isLoading: false });
      })
      .catch(err => console.log(err));
  }

  onHandleEntrySubmit = entry => {
    const entries = this.state.entries;
    entries.push(entry);
    this.setState({ entries: entries });
  };

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
        <Entry
          entries={this.state.entries}
          onHandleEntrySubmit={this.onHandleEntrySubmit}
        />
        <History
          entries={this.state.entries}
          isLoading={this.state.isLoading}
        />
      </div>
    );
  }
}

export default Profile;

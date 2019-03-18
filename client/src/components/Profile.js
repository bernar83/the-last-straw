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
      .get("/api/profile")
      .then(res => this.props.setCurrentUser(res.data))
      .catch(err => this.props.history.push("/login"));
  }

  componentDidMount() {
    axios
      .get("/api/entry")
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

  onHandleDeleteEntry = entryId => {
    axios
      .delete(`/api/entry/${entryId}`)
      .then(res => {
        const { entries } = this.state;
        const removeIndex = entries.map(item => item._id).indexOf(entryId);
        entries.splice(removeIndex, 1);
        this.setState({ entries: entries });
      })
      .catch(err => console.log(err));
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
          onHandleDeleteEntry={this.onHandleDeleteEntry}
        />
      </div>
    );
  }
}

export default Profile;

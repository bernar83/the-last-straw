import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Button from "@material-ui/core/Button";

import Entry from "./Entry";
import Navbar from "./Navbar";
import History from "./History";

class Profile extends Component {
  state = {
    entries: [],
    isLoading: true,
    isFormOpen: false,
    isEditMode: false,
    date: "",
    venue: "",
    amount: "",
    entryId: "0",
    errors: {}
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

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    if (
      this.state.errors.amount ||
      this.state.errors.venue ||
      this.state.errors.date
    ) {
      this.setState({ errors: {} });
    }
  };

  onHandleSubmit = event => {
    event.preventDefault();
    axios
      .post(`/api/entry/${this.state.entryId}`, {
        date: this.state.date,
        venue: this.state.venue,
        amount: this.state.amount
      })
      .then(res => {
        this.onHandleEntrySubmit(res.data);
        this.handleFormClose();
      })
      .catch(err => {
        this.setState({ errors: err.response.data }, () => {
          return;
        });
      });
  };

  onHandleEntrySubmit = entry => {
    const entries = this.state.entries;
    if (this.state.isEditMode) {
      const index = this.findIndex(entry._id, entries);
      entries.splice(index, 1, entry);
      this.setState({ isEditMode: false });
    } else {
      entries.push(entry);
    }
    this.setState({
      entries: entries,
      date: "",
      amount: "",
      venue: "",
      entryId: "0"
    });
  };

  onHandleDeleteEntry = (entryId, event) => {
    event.preventDefault();
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

  handleClickFormOpen = () => {
    this.setState({ isFormOpen: true });
  };

  handleFormClose = () => {
    this.setState(
      {
        isFormOpen: false
      },
      () => {
        this.setState({ date: "", venue: "", amount: "", entryId: "0" });
      }
    );
  };

  onHandleEditClick = (entryId, event) => {
    event.preventDefault();
    this.setFormData(entryId);
    this.setState({ isEditMode: true });
    this.handleClickFormOpen();
  };

  setFormData = entryId => {
    const entryToEdit = this.findEntry(entryId);
    this.setState({
      date: entryToEdit.date,
      venue: entryToEdit.venue,
      amount: entryToEdit.amount,
      entryId: entryToEdit._id
    });
  };

  findEntry = entryId => {
    const { entries } = this.state;
    const index = this.findIndex(entryId, entries);
    return entries[index];
  };

  findIndex = (entryId, entries) => {
    return entries.map(entry => entry._id).indexOf(entryId);
  };

  render() {
    const {
      errors,
      entries,
      date,
      venue,
      amount,
      isFormOpen,
      isLoading,
      setEditState
    } = this.state;

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
          entries={entries}
          onHandleSubmit={this.onHandleSubmit}
          errors={errors}
          date={date}
          venue={venue}
          amount={amount}
          onChange={this.onChange}
          isFormOpen={isFormOpen}
          handleFormClose={this.handleFormClose}
          setEditState={setEditState}
        />
        <Button
          onClick={this.handleClickFormOpen}
          color="primary"
          variant="contained"
        >
          New Entry
        </Button>
        <History
          entries={entries}
          isLoading={isLoading}
          onHandleDeleteEntry={this.onHandleDeleteEntry}
          onHandleEditClick={this.onHandleEditClick}
        />
      </div>
    );
  }
}

export default Profile;

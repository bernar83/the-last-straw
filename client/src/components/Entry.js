import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

class Entry extends Component {
  state = {
    date: "",
    venue: "",
    amount: "",
    errors: {}
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onHandleSubmit = event => {
    event.preventDefault();
    axios
      .post("/api/entry", {
        date: this.state.date,
        venue: this.state.venue,
        amount: this.state.amount
      })
      .then(res => {
        this.props.onHandleEntrySubmit(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({
      date: "",
      venue: "",
      amount: ""
    });
  };

  render() {
    const { errors } = this.state;

    return (
      <form onSubmit={this.onHandleSubmit}>
        <TextField
          label="Date"
          type="date"
          name="date"
          InputLabelProps={{
            shrink: true
          }}
          value={this.state.date}
          onChange={this.onChange}
          helperText={errors.date}
          error={errors.date ? true : false}
        />
        <TextField
          label="Venue"
          name="venue"
          value={this.state.venue}
          onChange={this.onChange}
          helperText={errors.venue}
          error={errors.venue ? true : false}
        />
        <TextField
          label="Amount of Straws"
          name="amount"
          value={this.state.amount}
          onChange={this.onChange}
          helperText={errors.amount}
          error={errors.amount ? true : false}
        />
        <Button
          variant="contained"
          type="submit"
          style={{ width: "400px", alignSelf: "center" }}
        >
          Submit!
        </Button>
      </form>
    );
  }
}

export default Entry;

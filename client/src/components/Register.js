import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from 'axios';

class Register extends Component {
  state = {
    username: "",
    password: "",
    passwordConfirmation: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onHandleSubmit = event => {
    event.preventDefault();

    axios.post('/register', {
      username: this.state.username,
      password: this.state.password
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <Typography variant="h3" gutterBottom>
          Register
        </Typography>
        <form onSubmit={this.onHandleSubmit}>
          <TextField
            label="Username"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <TextField
            label="Re-type Password"
            name="passwordConfirmation"
            type="password"
            value={this.state.passwordConfirmation}
            onChange={this.handleChange}
          />
          <Button variant="contained" type="submit">Register</Button>
        </form>
      </div>
    );
  }
}

export default Register;

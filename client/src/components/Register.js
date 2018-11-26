import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from "axios";

class Register extends Component {
  state = {
    username: "",
    password: "",
    passwordConfirmation: "",
    passwordsMatch: true
  };

  handleUserChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onHandleSubmit = event => {
    event.preventDefault();

    axios
      .post("/register", {
        username: this.state.username,
        password: this.state.password,
        passwordConfirmation: this.state.passwordConfirmation
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  onPassword = event => {
    this.setState({ password: event.target.value }, () => {
      this.checkPasswords();
    });
  };

  onConfirm = event => {
    this.setState({ passwordConfirmation: event.target.value }, () => {
      this.checkPasswords();
    });
  };

  checkPasswords() {
    if (this.state.password === this.state.passwordConfirmation) {
      this.setState({ passwordsMatch: true });
    } else {
      this.setState({ passwordsMatch: false });
    }
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
            onChange={this.handleUserChange}
            required={true}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.onPassword}
            required={true}
          />
          <TextField
            error={true}
            label="Re-type Password"
            name="passwordConfirmation"
            type="password"
            value={this.state.passwordConfirmation}
            onChange={this.onConfirm}
            required={true}
          />
          <Button variant="contained" type="submit">
            Register
          </Button>
        </form>
        {!this.state.passwordsMatch && <p>Passwords don't match!</p>}
      </div>
    );
  }
}

export default Register;

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
    passwordsMatch: true,
    errors: { passwordConfirmation: "" }
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
      .then(res => this.props.history.push("/login"))
      .catch(err => this.setState({ errors: err.response.data }));
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
    const { errors } = this.state;

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
            helperText={errors.username ? errors.username : ""}
            error={errors.username ? true : false}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.onPassword}
            helperText={errors.password ? errors.password : ""}
            error={errors.password ? true : false}
          />
          <TextField
            label="Re-type Password"
            name="passwordConfirmation"
            type="password"
            value={this.state.passwordConfirmation}
            onChange={this.onConfirm}
            helperText={errors.passwordConfirmation}
            error={errors.passwordConfirmation ? true : false}
          />
          <Button variant="contained" type="submit">
            Register
          </Button>
        </form>

        {!this.state.passwordsMatch ? (
          <Typography variant="body2" color={"error"} gutterBottom>
            Passwords don't match.
          </Typography>
        ) : (
          false
        )}
      </div>
    );
  }
}

export default Register;

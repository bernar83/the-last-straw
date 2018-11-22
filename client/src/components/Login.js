import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from "axios";

class Login extends Component {
  state = {
    username: "",
    password: "",
    message: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onHandleSubmit = event => {
    event.preventDefault();
    axios
      .post("/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Typography variant="h3" gutterBottom>
          Login
        </Typography>
        <form onSubmit={this.onHandleSubmit}>
          <TextField
            label="Username"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            required={true}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            required={true}
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </form>
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default Login;
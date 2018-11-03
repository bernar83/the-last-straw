import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class Register extends Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    return (
      <div>
        <Typography variant="h3" gutterBottom>
          Register
        </Typography>
        <form>
          <TextField
            label="Username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <TextField
            label="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <Button variant="contained">Register</Button>
        </form>
      </div>
    );
  }
}

export default Register;

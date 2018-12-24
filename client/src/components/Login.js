import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from "axios";
import jwt_decode from "jwt-decode";

import setAuthToken from "../utils/setAuthToken";

class Login extends Component {
  state = {
    username: "",
    password: "",
    message: "",
    errors: {}
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
        const { token } = res.data;

        localStorage.setItem("jwtToken", token);

        setAuthToken(token);

        const decoded = jwt_decode(token);

        this.props.setCurrentUser(decoded);

        if (this.props.isAuthenticated) {
          this.props.history.push("/profile");
        }
      })
      .catch(err => this.setState({ errors: err.response.data }));
  };

  render() {
    const { errors } = this.state;

    return (
      <div style={{ padding: "80px" }}>
        <Typography variant="h3" gutterBottom align="center">
          Login
        </Typography>
        <form
          onSubmit={this.onHandleSubmit}
          style={{ display: "flex", flexWrap: "wrap", flexDirection: "column" }}
        >
          <TextField
            label="Username"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            helperText={errors.username ? errors.username : ""}
            error={errors.username ? true : false}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            helperText={errors.password ? errors.password : ""}
            error={errors.password ? true : false}
            style={{ marginBottom: "40px" }}
          />
          <Button
            variant="contained"
            type="submit"
            style={{ width: "400px", alignSelf: "center" }}
          >
            Login
          </Button>
        </form>
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default Login;

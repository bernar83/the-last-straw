import React, { Component } from "react";
import Button from "@material-ui/core/Button";

import setAuthToken from "../utils/setAuthToken";
import history from "../utils/history";
import { Link } from "react-router-dom";

class Navbar extends Component {
  logOutCurrentUser = () => {
    localStorage.removeItem("jwtToken");

    setAuthToken(false);

    this.props.setCurrentUser({});

    history.push("/");
  };

  render() {
    return (
      <div>
        <Button onClick={this.logOutCurrentUser} variant="contained">
          Log Out
        </Button>
        <Button variant="contained" component={Link} to={"/history"}>
          History
        </Button>
      </div>
    );
  }
}

export default Navbar;

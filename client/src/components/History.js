import React, { Component } from "react";
import axios from "axios";

import Navbar from "./Navbar";

class History extends Component {
  componentWillMount() {
    if (!this.props.isAuthenticated) {
      this.props.history.push("/login");
    } else {
      axios
        .get("/history")
        .then(res => {
          console.log(res.data);
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    return (
      <div>
        <Navbar
          setCurrentUser={this.props.setCurrentUser}
          destination={"profile"}
        />
      </div>
    );
  }
}

export default History;

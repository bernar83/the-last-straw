import React, { Component } from "react";
import axios from "axios";

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
    return <h1>hello history</h1>;
  }
}

export default History;

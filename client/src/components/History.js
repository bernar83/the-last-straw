import React, { Component } from "react";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import Navbar from "./Navbar";

class History extends Component {
  state = {
    entries: [],
    isLoading: true
  };

  componentWillMount() {
    if (!this.props.isAuthenticated) {
      this.props.history.push("/login");
    } else {
      axios
        .get("/history")
        .then(res => {
          this.setState({ entries: res.data, isLoading: false });
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    console.log(this.state.entries);

    return (
      <div>
        <Navbar
          setCurrentUser={this.props.setCurrentUser}
          destination={"profile"}
        />
        <Typography variant="h2" align="center" gutterBottom>
          History
        </Typography>
        {!this.state.isLoading ? (
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Venue</TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.entries.map(entry => {
                  return (
                    <TableRow key={entry._id}>
                      <TableCell component="th" scope="row">
                        {entry.date}
                      </TableCell>
                      <TableCell align="right">{entry.venue}</TableCell>
                      <TableCell align="right">{entry.amount}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        ) : (
          <Typography variant="body1" align="left">
            Loading...
          </Typography>
        )}
      </div>
    );
  }
}

export default History;

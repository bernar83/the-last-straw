import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

class History extends Component {
  render() {
    return (
      <div>
        {!this.props.isLoading ? (
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Venue</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.entries.map(entry => {
                  return (
                    <TableRow key={entry._id}>
                      <TableCell component="th" scope="row">
                        {entry.date}
                      </TableCell>
                      <TableCell>{entry.venue}</TableCell>
                      <TableCell>{entry.amount}</TableCell>
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

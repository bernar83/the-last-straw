import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class History extends Component {
  render() {
    const { onHandleDeleteEntry, onHandleEditClick } = this.props;

    return (
      <div>
        {this.props.entries.length > 0 ? (
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
                      <TableCell>
                        <Button
                          onClick={e => onHandleDeleteEntry(entry._id, e)}
                          variant="contained"
                        >
                          Delete
                        </Button>
                        <Button
                          onClick={e => onHandleEditClick(entry._id, e)}
                          variant="contained"
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        ) : (
          <Typography variant="body1" align="left">
            Add an entry!
          </Typography>
        )}
      </div>
    );
  }
}

export default History;

import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

class Entry extends Component {
  render() {
    const {
      errors,
      date,
      venue,
      amount,
      onHandleSubmit,
      onChange,
      isFormOpen,
      handleFormClose
    } = this.props;

    return (
      <Dialog open={isFormOpen} onClose={handleFormClose}>
        <DialogTitle>Entry</DialogTitle>
        <DialogContent>
          <TextField
            label="Date"
            type="date"
            name="date"
            InputLabelProps={{
              shrink: true
            }}
            value={date}
            onChange={onChange}
            helperText={errors.date}
            error={errors.date ? true : false}
          />
          <TextField
            label="Venue"
            name="venue"
            value={venue}
            onChange={onChange}
            helperText={errors.venue}
            error={errors.venue ? true : false}
          />
          <TextField
            label="Amount of Straws"
            name="amount"
            value={amount}
            onChange={onChange}
            helperText={errors.amount}
            error={errors.amount ? true : false}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormClose} color="primary">
            Cancel
          </Button>
          <Button onClick={e => onHandleSubmit(e)} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default Entry;

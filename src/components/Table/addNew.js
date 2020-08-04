import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export default function AddNew(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [newlabel, setNewLabel] = React.useState("");
  const [newDesc, setNewDesc] = React.useState("");
  const [assignedTo, setAssignedTo] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAssignedTo("");
    setNewDesc("");
    setNewLabel("");
  };
  const handleSave = () => {
    props.addNew({
      label: newlabel,
      description: newDesc,
      status: "To Do",
      user: assignedTo,
    });
    setAssignedTo("");
    setNewDesc("");
    setNewLabel("");
    setOpen(false);
  };

  const handleChange = (event) => {
    setAssignedTo(event.target.value);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Task
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Mandatory fields: Label, Description.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Label"
            type="text"
            fullWidth
            required
            onChange={(e) => {
              setNewLabel(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            multiline
            required
            rows={4}
            label="Description"
            type="text"
            fullWidth
            onChange={(e) => {
              setNewDesc(e.target.value);
            }}
          />
          <FormControl className={classes.dropDown}>
            <InputLabel id="demo-simple-select-label">Assign To</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={assignedTo}
              onChange={handleChange}
            >
              {props.users.map((user) => {
                return (
                  <MenuItem key={user.name} value={user.name}>
                    {user.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            color="primary"
            disabled={newlabel === "" && newDesc === ""}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  dropDown: {
    minWidth: "100%",
  },
}));

export { AddNew };

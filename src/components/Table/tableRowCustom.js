import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import { possibleStates } from "./constants";

function TableRowCustom(props) {
  const classes = useStyles();

  const [userValue, setuserValue] = React.useState(props.row.user);
  const [statusValue, setStatusValue] = React.useState(props.row.status);

  useEffect(() => {
    setuserValue(props.row.user);
  }, []);

  const { row, index } = props;
  return (
    <TableRow hover tabIndex={-1}>
      <TableCell component="th" scope="row" padding="none">
        {row.label}
      </TableCell>
      <TableCell align="left">{row.description}</TableCell>
      <TableCell align="center">
        <FormControl className={classes.formControl}>
          <Select
            value={statusValue}
            onChange={(e) => {
              props.changeStatus(index, e);
              setStatusValue(e.target.value);
            }}
            className={classes.selectEmpty}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={row.status}>{row.status}</MenuItem>
            {possibleStates[statusValue].map((user) => {
              return (
                <MenuItem key={user} value={user}>
                  {user}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </TableCell>
      <TableCell align="center">
        <FormControl className={classes.formControl}>
          <Select
            value={userValue}
            onChange={(e) => {
              props.changeUser(index, e);
              setuserValue(e.target.value);
            }}
            className={classes.selectEmpty}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="" disabled>
              {row.user}
            </MenuItem>
            {props.users.map((user) => {
              return (
                <MenuItem key={user.name} value={user.name}>
                  {user.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </TableCell>
      <TableCell padding="checkbox">
        <Checkbox />
      </TableCell>
    </TableRow>
  );
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
export { TableRowCustom };

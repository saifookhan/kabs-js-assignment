import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import { EnhancedTableToolbar } from "./toolbar";
import { EnhancedTableHead } from "./head";
import { TableRowCustom } from "./tableRowCustom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
}));
export default function TableMain() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [tasks, setTasks] = React.useState([]);
  const [filteredTasks, setFilteredTasks] = React.useState("");
  const [filterSwitch, setFilterSwitch] = React.useState(false);
  const users = [
    { name: "Saif Imran" },
    { name: "Jon Doe" },
    { name: "Jane Doe" },
  ];

  useEffect(() => {
    setTasks(tasks);
  }, [tasks]);

  const handleAddNewTask = (task) => {
    // console.log(task);
    setTasks((oldArray) => [...oldArray, task]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleFilter = (status) => {
    if (status !== "") {
      var newList = tasks.filter((task) => {
        return task.status === status;
      });
      // console.log("asd" + status, newList);
      setFilteredTasks(newList);
      setFilterSwitch(true);
    } else {
      //remove filter
      setFilteredTasks("");
      setFilterSwitch(false);
    }
  };

  function handleChangeUser(key, event) {
    let oldArr = tasks;
    oldArr[key].user = event.target.value;
    setTasks(oldArr);
  }

  function handleChangeTaskStatus(key, event) {
    let oldArr = tasks;
    oldArr[key].status = event.target.value;
    setTasks(oldArr);
  }
  function handleDeleteTask(key) {
    setTasks(tasks.slice(0, key).concat(tasks.slice(key + 1, tasks.length)));
  }

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, tasks.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          filteredTasks={filteredTasks.length}
          users={users}
          addNew={handleAddNewTask}
          handleFilter={handleFilter}
          filterSwitch={filterSwitch}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead classes={classes} rowCount={tasks.length} />
            <TableBody>
              {(filteredTasks || tasks)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRowCustom
                      users={users}
                      key={index}
                      row={row}
                      index={index}
                      changeUser={handleChangeUser}
                      changeStatus={handleChangeTaskStatus}
                      deleteTask={handleDeleteTask}
                    ></TableRowCustom>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tasks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}

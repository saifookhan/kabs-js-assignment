import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

import { AddNew } from "./addNew";
import { statuses } from "./constants";

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { filteredTasks, filterSwitch } = props;

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: filterSwitch,
      })}
    >
      {filterSwitch ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {filteredTasks} filtered
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Tasks
        </Typography>
      )}

      {filterSwitch ? (
        <Tooltip title="Delete">
          <IconButton
            aria-label="delete"
            onClick={(e) => {
              props.handleFilter("");
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <span>
          <Tooltip title="Filter list">
            <IconButton
              aria-label="filter list"
              ref={anchorRef}
              onClick={(e) => {
                handleToggle();
              }}
            >
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: "center top",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open}>
                      {statuses.map((status) => {
                        return (
                          <MenuItem
                            key={status.type}
                            value={status.type}
                            onClick={(e) => {
                              handleClose(e);
                              props.handleFilter(status.type);
                            }}
                          >
                            {status.type}
                          </MenuItem>
                        );
                      })}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </span>
      )}
      <AddNew
        users={props.users}
        addNew={props.addNew}
        handleFilter={props.handleFilter}
      ></AddNew>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  filteredTasks: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

export { EnhancedTableToolbar };

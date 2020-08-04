import React from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const headCells = [
  {
    id: "label",
    disablePadding: false,
    label: "Label",
    align: "left",
  },
  {
    id: "desc",
    disablePadding: false,
    label: "Description",
    align: "left",
  },
  { id: "status", disablePadding: true, label: "Status", align: "center" },
  {
    id: "Assigned",
    disablePadding: false,
    label: "Assigned To",
    align: "center",
  },
  { id: "delete", disablePadding: true, label: "Delete", align: "center" },
];

function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "default"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  rowCount: PropTypes.number.isRequired,
};

export { EnhancedTableHead };

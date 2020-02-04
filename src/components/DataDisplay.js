import React from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
// import { setColumns, setRows } from "../redux/actions";
import { connect } from "react-redux";

function DataDisplay(props) {
  return (
    <div className="data-display-container">
      <div className="data-display">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {props.columns.map(item => (
                  <TableCell>{item}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.rows.map(row => (
                <TableRow>
                  {row.map(item => (
                    <TableCell>{item}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  columns: state.columns,
  rows: state.rows
});

export default connect(mapStateToProps)(DataDisplay);

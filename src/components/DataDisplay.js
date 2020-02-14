import React, { useState } from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Typography,
  Button
} from "@material-ui/core";
import { setColumns, setRows, setFileName } from "../redux/actions";
import { connect } from "react-redux";
import "./DataDisplay.css";
import DeleteIcon from "@material-ui/icons/Delete";

function DataDisplay(props) {
  const [name, setName] = useState(props.fileName);
  return (
    <div className="data-display-container">
      <div className="data-display">
        {/* <div className="title-container">
          <TextField
            label="File Name:"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <br />
          <Button color="primary" onClick={() => props.setFileName(name)}>
            Change
          </Button>
          <br />
        </div> */}
        <br />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Index</TableCell>
                {props.columns.map(item => (
                  <TableCell>{item}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.rows.map((row, index) => (
                <TableRow>
                  <TableCell>
                    <span className="index">{index + 1}</span>
                    <Button
                      className="delete"
                      onClick={() => {
                        props.setRows([
                          ...props.rows.slice(0, index),
                          ...props.rows.slice(index + 1)
                        ]);
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
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
  rows: state.rows,
  fileName: state.fileName
});

const mapDispatchToProps = dispatch => ({
  setColumns: columns => dispatch(setColumns(columns)),
  setRows: rows => dispatch(setRows(rows)),
  setFileName: fileName => dispatch(setFileName(fileName))
});

export default connect(mapStateToProps, mapDispatchToProps)(DataDisplay);

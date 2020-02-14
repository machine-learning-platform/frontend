import React, { useState } from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
  // TextField,
  // Typography
} from "@material-ui/core";
import { setColumns, setRows, setFileName } from "../redux/actions";
import { connect } from "react-redux";
import "./DataDisplay.css";
import DeleteIcon from "@material-ui/icons/Delete";

function DataDisplay(props) {
  // const [name, setName] = useState(props.fileName);
  const [deletedItem, setDeletedItem] = useState("");
  const [deletedIndex, setDeletedIndex] = useState(-1);
  const [openDelete, setOpenDelete] = useState(false);
  const deleteRow = index => {
    props.setRows([
      ...props.rows.slice(0, index),
      ...props.rows.slice(index + 1)
    ]);
  };

  const deleteColumn = index => {
    props.setColumns([
      ...props.columns.slice(0, index),
      ...props.columns.slice(index + 1)
    ]);
    props.setRows(
      props.rows.map(row => [...row.slice(0, index), ...row.slice(index + 1)])
    );
  };
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
                {props.columns.map((item, index) => (
                  <TableCell>
                    <div className="text-container">{item}</div>
                    <div className="button-container">
                      <Button
                        className="delete"
                        onClick={() => {
                          setOpenDelete(true);
                          setDeletedIndex(index);
                          setDeletedItem("column");
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.rows.map((row, index) => (
                <TableRow>
                  <TableCell>
                    <div className="text-container">{index + 1}</div>
                    <div className="button-container">
                      <Button
                        className="delete"
                        onClick={() => {
                          setOpenDelete(true);
                          setDeletedIndex(index);
                          setDeletedItem("row");
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </div>
                  </TableCell>
                  {row.map(item => (
                    <TableCell>{item}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openDelete}>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to discard {deletedItem} {deletedIndex}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenDelete(false);
                if (deletedItem === "column") {
                  deleteColumn(deletedIndex);
                } else if (deletedItem === "row") {
                  deleteRow(deletedIndex);
                }
              }}
            >
              Yes
            </Button>
            <Button
              onClick={() => {
                setOpenDelete(false);
              }}
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
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

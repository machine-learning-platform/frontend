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
import { addColumns } from "../redux/actions";
import { connect } from "react-redux";
import "./DataDisplay.css";

function DataEncoding(props) {
  const [openOneHotEncoding, setOpenOneHotEncoding] = useState(false)
  const [variable, setVar]
  return (
    <div className="data-encoding-container">
      <div className="data-encoding">
        {/* <Button>Label Encoding</Button> */}
        <Button onClick={() => setOpenOneHotEncoding(true)}>One Hot Encoding</Button>



        <Dialog open={openOneHotEncoding}>
          <DialogTitle>One Hot Encoding</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please select a variable to be encoded.
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
  rows: state.rows
});

const mapDispatchToProps = dispatch => ({
  addColumns: (column, data) => dispatch(addColumns({ column, data }))
});

export default connect(mapStateToProps, mapDispatchToProps)(DataEncoding);

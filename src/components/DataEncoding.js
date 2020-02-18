import React, { useState } from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
import _ from "lodash";
import "./DataDisplay.css";

function DataEncoding(props) {
  const [openOneHotEncoding, setOpenOneHotEncoding] = useState(false);
  const [
    openOneHotEncodingConfirmation,
    setOpenOneHotEncodingConfirmation
  ] = useState(false);
  const [variable, setVariable] = useState(0);
  const [newColumns, setNewColumns] = useState([]);
  const [possibleValues, setPossibleValues] = useState({});
  const [newData, setNewData] = useState([]);
  const createNewColumns = index => {
    const prefix = props.columns[index];
    const source = props.rows.map(row => row[index]);
    const possibilities = _.uniq(source);
    const temp = {};
    possibilities.forEach((value, index) => {
      temp[value] = index;
    });
    console.log(source);
    setPossibleValues(temp);
    console.log(temp);
    setNewColumns(possibilities.map(item => prefix + "_" + String(item)));
    createNewData(index, possibilities.length);
  };
  const createNewData = (index, number) => {
    const data = props.rows.map(row => {
      const value = row[index];
      const res = new Array(number).fill(0);
      res[possibleValues[value]] = 1;
      return res;
    });
    setNewData(data);

    console.log(data);
  };

  return (
    <div className="data-encoding-container">
      <div className="data-encoding">
        {/* <Button>Label Encoding</Button> */}
        <Button onClick={() => setOpenOneHotEncoding(true)}>
          One Hot Encoding
        </Button>

        <Dialog open={openOneHotEncoding}>
          <DialogTitle>One Hot Encoding</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please select a variable to be encoded.
            </DialogContentText>
            <FormGroup>
              <FormControl>
                <InputLabel>Variable</InputLabel>
                <Select
                  id="variable-select"
                  value={variable}
                  onChange={e => setVariable(e.target.value)}
                >
                  {props.columns.map((item, index) => (
                    <MenuItem value={index}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </FormGroup>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenOneHotEncodingConfirmation(true);
                createNewColumns(variable);
                setOpenOneHotEncoding(false);
              }}
            >
              Yes
            </Button>
            <Button
              onClick={() => {
                setOpenOneHotEncoding(false);
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
  addColumns: (columns, data) => dispatch(addColumns({ columns, data }))
});

export default connect(mapStateToProps, mapDispatchToProps)(DataEncoding);

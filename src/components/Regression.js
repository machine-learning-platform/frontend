import React, { useState, useEffect } from "react";
import json2csv from "json2csv";
import axios from "axios";
import { connect } from "react-redux";
import {
  FormGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  Button,
  MenuItem,
  Select,
  InputLabel,
  Dialog,
  Switch,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField
} from "@material-ui/core";

function Regression(props) {
  const [DV, setDV] = useState(0);
  const [IV, setIV] = useState(props.columns.map(() => false));
  const handleDVChange = e => {
    const index = e.target.value;
    const newIV = IV.concat();
    newIV[index] = false;
    setIV(newIV);
    setDV(index);
  };
  const handleIVChange = index => e => {
    const newIV = IV.concat();
    newIV[index] = e.target.checked;
    setIV(newIV);
  };
  const handleSubmit = () => {
    axios.post("/regression", {
      DV: props.columns[DV],
      IV: props.columns.filter((value, index) => IV[index]),
      y: props.rows.map(row => row[DV]),
      X: props.rows.map(row => row.filter((value, index) => IV[index]))
    });
  };
  return (
    <div className="regression-container">
      <div className="regression">
        <FormControl>
          <FormLabel>
            Please choose your dependent variable and independent variable(s).
            (You can only choose one dependent variable.)
          </FormLabel>
          <FormGroup>
            <FormControl>
              <InputLabel>Dependent Variable</InputLabel>
              <Select id="dv-select" value={DV} onChange={handleDVChange}>
                {props.columns.map((item, index) => (
                  <MenuItem value={index}>{item}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </FormGroup>
          <FormGroup row>
            {props.columns.map((item, index) => (
              <FormControlLabel
                disabled={DV === index}
                control={
                  <Switch
                    checked={IV[index]}
                    onChange={handleIVChange(index)}
                  />
                }
                label={item}
              />
            ))}
          </FormGroup>
        </FormControl>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  columns: state.columns,
  rows: state.rows
});

export default connect(mapStateToProps)(Regression);

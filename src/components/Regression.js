import React, { useState, useEffect } from "react";
import json2csv from "json2csv";
import axios from "axios";
import { connect } from "react-redux";
import _ from "lodash";
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
  // Used to display the result of regression.
  const [DVName, setDVName] = useState("");
  const [IVNames, setIVNames] = useState([]);
  const [score, setScore] = useState(0);
  const [coefficients, setCoefficients] = useState([]);
  const [intercept, setIntercept] = useState(0);
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
    setDVName(props.columns[DV]);
    setIVNames(props.columns.filter((value, index) => IV[index]));
    axios
      .post("/regression", {
        y: props.rows.map(row => Number(row[DV])),
        X: props.rows.map(row =>
          row.map(Number).filter((value, index) => IV[index])
        )
      })
      .then(response => {
        console.log(response.data);
        setScore(response.data["score"]);
        setCoefficients(response.data["coefficients"]);
        setIntercept(response.data["intercept"]);
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
          <div>Independent Varialbe</div>
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
        {coefficients.length ? (
          <div>
            {DVName +
              "=" +
              _.zip(coefficients, IVNames)
                .map(item => item.join(" * "))
                .join(" + ") +
              intercept}
          </div>
        ) : null}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  columns: state.columns,
  rows: state.rows
});

export default connect(mapStateToProps)(Regression);

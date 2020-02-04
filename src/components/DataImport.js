import React, { useState } from "react";
import {
  FormGroup,
  FormLabel,
  Button,
  Dialog,
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
import CSVReader from "react-csv-reader";
import "./DataImport.css";
import { setColumns, setRows } from "../redux/actions";
import { connect } from "react-redux";

function DataImport(props) {
  const [data, setData] = useState([]);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openSetColumnNames, setOpenSetColumnNames] = useState(false);
  const [columnNames, setColumnNames] = useState([]);
  return (
    <div className="data-import-container">
      <div className="data-import">
        <FormGroup controlId="file">
          <FormLabel>Submit your data</FormLabel>
          <CSVReader
            id="fileInput"
            style={{ display: "none" }}
            onFileLoaded={data => {
              setOpenConfirmation(true);
              setData(data);
            }}
          />
          <Button
            onClick={() =>
              document.getElementsByClassName("csv-input")[0].click()
            }
            color={"primary"}
          >
            Submit
          </Button>
        </FormGroup>
        <Dialog open={openConfirmation}>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              The first row in your csv file looks like this:
            </DialogContentText>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {data.length
                      ? data[0].map(item => <TableCell>{item}</TableCell>)
                      : null}
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
            <DialogContentText>
              Do you want to use the first row in your csv file as the column
              header?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenConfirmation(false);
                props.setColumns(data[0]);
                props.setRows(data.slice(1));
              }}
            >
              Yes
            </Button>
            <Button
              onClick={() => {
                setOpenConfirmation(false);
                setOpenSetColumnNames(true);
                setColumnNames(data[0].map(() => ""));
              }}
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openSetColumnNames}>
          <DialogTitle>Set Column Names</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please set the column names. (The following table contains the
              first five rows in your csv file.)
            </DialogContentText>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {columnNames.length
                      ? columnNames.map((item, index) => (
                          <TableCell>
                            <TextField
                              required
                              id={index}
                              value={columnNames[index]}
                              onChange={e => {
                                setColumnNames([
                                  ...columnNames.slice(0, index),
                                  e.target.value,
                                  ...columnNames.slice(index + 1)
                                ]);
                              }}
                            />
                          </TableCell>
                        ))
                      : null}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.length
                    ? data.slice(0, 5).map(row => (
                        <TableRow>
                          {row.map(item => (
                            <TableCell>{item}</TableCell>
                          ))}
                        </TableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenSetColumnNames(false);
                props.setColumns(columnNames);
                props.setRows(data);
              }}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  setColumns: columns => dispatch(setColumns(columns)),
  setRows: rows => dispatch(setRows(rows))
});

export default connect(null, mapDispatchToProps)(DataImport);

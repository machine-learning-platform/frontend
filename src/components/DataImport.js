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
import { setColumns, setRows, setFileName } from "../redux/actions";
import { connect } from "react-redux";

function DataImport(props) {
  const [data, setData] = useState([]);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openSetColumnNames, setOpenSetColumnNames] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [columnNames, setColumnNames] = useState([]);
  return (
    <div className="data-import-container">
      <div className="data-import">
        <FormGroup controlId="file">
          <CSVReader
            id="fileInput"
            style={{ display: "none" }}
            onFileLoaded={data => {
              setOpenConfirmation(true);
              setData(data);
              props.setFileName("My Data");
            }}
          />
          <div className="button-container">
            <Button
              onClick={() => {
                if (props.columns.length) setOpenDelete(true);
                else {
                  const csvInput = document.getElementsByClassName(
                    "csv-input"
                  )[0];
                  csvInput.click();
                }
              }}
              color="primary"
            >
              Submit your data
            </Button>
          </div>
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
              color="primary"
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

        <Dialog open={openDelete}>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to discard the data that you are currently
              working with?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenDelete(false);
                props.setColumns([]);
                props.setRows([]);
                document.getElementsByClassName("csv-input")[0].click();
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
  columns: state.columns
});

const mapDispatchToProps = dispatch => ({
  setColumns: columns => dispatch(setColumns(columns)),
  setRows: rows => dispatch(setRows(rows)),
  setFileName: fileName => dispatch(setFileName(fileName))
});

export default connect(mapStateToProps, mapDispatchToProps)(DataImport);

import React from "react";
import { FormGroup, FormLabel, Button } from "@material-ui/core";
import CSVReader from "react-csv-reader";
import "./DataSubmission.css";

export default function DataSubmission() {
  return (
    <div className="data-submission-container">
      <div className="data-submission">
        <FormGroup controlId="file">
          <FormLabel>Submit your data</FormLabel>

          <CSVReader
            id="fileInput"
            style={{ display: "none" }}
            onFileLoaded={data => console.log(data)}
          />
          <Button onClick={onClick}>Submit</Button>
        </FormGroup>
      </div>
    </div>
  );
}

// const onChange = files => console.log(files);
const onClick = () => document.getElementsByClassName("csv-input")[0].click();

import React from "react";
import { FormGroup, FormLabel, FormControl, Button } from "@material-ui/core";

function DataSubmission() {
  return (
    <div className="data-submission-container">
      <div className="data-submission">
        <FormGroup controlId="file">
          <FormLabel>Submit your data</FormLabel>
          <input type="file" style={{ display: "none" }} id="fileInput" />
          <Button onClick={onClick}>Submit</Button>
        </FormGroup>
      </div>
    </div>
  );
}

const onClick = () => document.getElementById("fileInput").click();

export default DataSubmission;

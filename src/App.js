import React from "react";
import "./App.css";
import DataImport from "./components/DataImport";
import DataDisplay from "./components/DataDisplay";
import Regression from "./components/Regression";
import { connect } from "react-redux";

function App(props) {
  return (
    <div className="App">
      <DataImport />
      {props.columns.length ? <Regression /> : null}
    </div>
  );
}

const mapStateToProps = state => ({
  columns: state.columns
});

export default connect(mapStateToProps)(App);

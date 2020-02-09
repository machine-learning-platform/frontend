import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import DataImport from "./components/DataImport";
import DataDisplay from "./components/DataDisplay";
import Regression from "./components/Regression";
import { connect } from "react-redux";

function App(props) {
  return (
    <div className="App">
      <Router>
        <AppBar position="static">
          <Tabs>
            <Tab label="Import Data" component={Link} to="/data-import" />
            <Tab label="Display Data" component={Link} to="/data-display" />
            <Tab label="Regression" component={Link} to="/regression" />
          </Tabs>
        </AppBar>
        <Switch>
          <Route path="/data-import">
            <br />
            {!props.columns.length ? (
              <div>Please import your data before you proceed.</div>
            ) : null}
            <br />
            <DataImport />
          </Route>
          <Route path="/data-display">
            <br />
            {!props.columns.length ? (
              <div>Please import your data before you proceed.</div>
            ) : null}
            <br />
            {props.columns.length ? <DataDisplay /> : <DataImport />}
          </Route>
          <Route path="/regression">
            <br />
            {!props.columns.length ? (
              <div>Please import your data before you proceed.</div>
            ) : null}
            <br />
            {props.columns.length ? <Regression /> : <DataImport />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = state => ({
  columns: state.columns
});

export default connect(mapStateToProps)(App);

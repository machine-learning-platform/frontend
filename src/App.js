import React from "react";
import "./App.css";
import DataImport from "./components/DataImport";
import DataDisplay from "./components/DataDisplay";

function App() {
  return (
    <div className="App">
      <DataImport />
      <DataDisplay />
    </div>
  );
}

export default App;

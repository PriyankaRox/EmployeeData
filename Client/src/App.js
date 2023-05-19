import React from "react";
import "./App.css";
import { Router } from "@reach/router";
import AddEmployee from "./components/employee/AddEmployee";
import ViewEmployee from "./components/employee/ViewEmployee";
import UpdateEmployee from "./components/employee/UpdateEmployee";


function App() {
  return (
    <div className="App">
      <Router>
        <AddEmployee path="/" />
        <ViewEmployee path="/view"/>
        <UpdateEmployee path="/update/:id"/>
      </Router>
    </div>
  );
}

export default App;

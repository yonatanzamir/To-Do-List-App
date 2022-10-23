import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoList from "./component/TodoList"

function App() {

  const API_ADDRESS = "http://localhost:3001";


  return (
    <div className="App">
      <div className="card" id="card">
        <div className="card-data" id="card-data">
          <h3>Your tasks</h3>
          <hr />
          <div className="todolistapp">
          <TodoList apiAddress={API_ADDRESS} ></TodoList>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import React from "react";
import TaskList from "./components/TaskList";
import todoAppImage from "./resources/kisspng-computer-icons-encapsulated-postscript-5adab660706b60.0873723815242829764605.png";

function App() {
  return (
    <div>
      <h1 style={{ position: "relative", display: "flex", alignItems: "center", color:"#ffc107" }}>
        My Todo App
        <img
          src={todoAppImage}
          alt="Todo App Icon"
          style={{
            marginLeft: "10px",
            width: 30,
            height: "auto",
          }}
        />
      </h1>
      <TaskList />
    </div>
  );
}

export default App;


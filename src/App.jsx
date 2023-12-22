// Import the TaskList component at the top of your App.jsx
import React from "react";
import TaskList from "./TaskList"; // Assuming TaskList is in the 'components' directory

function App() {
  return (
    <div>
      <h1>My Todo App</h1>
      <TaskList />
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import "../styles.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/"
      );
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddTask = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: newTask,
            completed: false,
          }),
        }
      );

      const data = await response.json();
      setTasks([data, ...tasks]); // Add new task at the beginning of the array
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleEditTask = async (taskId, newTitle) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: newTitle,
          }),
        }
      );

      if (response.ok) {
        const updatedTasks = tasks.map((task) =>
          task.id === taskId ? { ...task, title: newTitle } : task
        );
        setTasks(updatedTasks);
        setEditingTaskId(null);
      }
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${taskId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <h2>Add New Task</h2>
      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New Task"
        />
        <button className="add-btn" onClick={handleAddTask}>
          Add Task
        </button>
      </div>

      <h2>Task List</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            {editingTaskId === task.id ? (
              <div className="task-edit">
                <input
                  type="text"
                  value={task.title}
                  onChange={(e) => handleEditTask(task.id, e.target.value)}
                />
                <button
                  className="edit-btn"
                  onClick={() => setEditingTaskId(null)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="task-details">
                <span>{task.title}</span>
                <button
                  className="edit-btn"
                  onClick={() => setEditingTaskId(task.id)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;

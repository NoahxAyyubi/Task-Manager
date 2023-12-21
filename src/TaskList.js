const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

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
      setTasks([...tasks, data]);
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>

      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New Task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
};

export default TaskList;

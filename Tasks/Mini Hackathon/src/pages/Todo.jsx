import { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import DeleteModal from "../components/DeleteModal";
import EditModal from "../components/EditModal";
import "../styles/todo.css";
import { useNavigate } from "react-router-dom";



const Todo = () => {
  const [time, setTime] = useState("");
  const navigate = useNavigate();

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks
      ? JSON.parse(savedTasks)
      : [
          "Finish HTML Layout",
          "Add CSS Styling",
          "Implement JavaScript Logic",
          "Push Code to GitHub",
        ];
  });

  const [input, setInput] = useState("");

  const [showDelete, setShowDelete] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [showEdit, setShowEdit] = useState(false);
  const [editInput, setEditInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Clock
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-US"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;

    setTasks([...tasks, input]);
    setInput("");
  };

  const deleteTask = (index) => {
    setDeleteIndex(index);
    setShowDelete(true);
  };

  const confirmDelete = () => {
    const updatedTasks = tasks.filter((_, i) => i !== deleteIndex);
    setTasks(updatedTasks);
    setShowDelete(false);
  };

  const editTask = (task, index) => {
    setEditInput(task);
    setEditIndex(index);
    setShowEdit(true);
  };

  const saveEdit = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editIndex] = editInput;

    setTasks(updatedTasks);
    setShowEdit(false);
  };

  return (
    <div className="container">
      <div>
        <h1>To Do List with React JS </h1>
        <button className="close-btn" onClick={() => navigate("/")}>
          ✖
        </button>
      </div>

      <div className="tablet">
        <div className="top-bar">
          <span>Hello,</span>
          <span>{time}</span>
        </div>

        <h2>To Do List 📝</h2>

        <div className="task-input">
          <input
            type="text"
            placeholder="Add new task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button onClick={addTask}>Add</button>
        </div>

        <TaskList tasks={tasks} deleteTask={deleteTask} editTask={editTask} />

        {showDelete && (
          <DeleteModal
            confirmDelete={confirmDelete}
            close={() => setShowDelete(false)}
          />
        )}

        {showEdit && (
          <EditModal
            editInput={editInput}
            setEditInput={setEditInput}
            saveEdit={saveEdit}
          />
        )}
      </div>
    </div>
  );
};

export default Todo;

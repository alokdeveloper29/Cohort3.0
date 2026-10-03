import { RiDeleteBinFill, RiEdit2Fill } from "react-icons/ri";

const TaskList = ({ tasks, deleteTask, editTask }) => {
  return (
    <div className="allTask">
      {tasks.map((task, index) => (
        <div className="task-list" key={index}>
          <div className="task">
            <span>{task}</span>

            <div className="delete-edit">
              <button onClick={() => editTask(task, index)}>
                <RiEdit2Fill />
              </button>

              <button onClick={() => deleteTask(index)}>
                <RiDeleteBinFill />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;

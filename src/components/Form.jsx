import { useEffect, useState } from "react";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const Form = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [taskid, setTaskid] = useState(null);
  const [showFinished, setShowFinished] = useState("")
  const textRef = useRef(null);
  const taskRef = useRef(null);

  useEffect(() => {
    let taskString = localStorage.getItem("tasks");
    if(taskString){
    try {
        const parsedTasks = JSON.parse(taskString);
        setTasks(parsedTasks);
      } catch (error) {
        console.error("Error parsing tasks:", error);
      }
    }
  }, [])
  

  useEffect(() => {
      if(tasks.length > 0){
        localStorage.setItem("tasks", JSON.stringify(tasks))
      }else{
        localStorage.removeItem("tasks")
      }
  }, [tasks]);
  
  const handleFinish = () => {
    setShowFinished(!showFinished)
  }
  const handleEdit = (item) => {
    setTask(item.task);
    setTaskid(item.id);
  };
  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const handleChange = (e) => {
    setTask(e.target.value);
  };
  const handleAdd = () => {
    if (task.trim()) {
      if (taskid) {
        setTasks(
          tasks.map((item) => (item.id === taskid ? { ...item, task } : item))
        );
        setTaskid(null);
      } else {
        setTasks([...tasks, { id: uuidv4(), task, isCompleted: false }]);
      }
      setTask("");
    }
  };
  const handleCheckBox = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  return (
    <>
      <div className="formContainer">
        <div className="form flex  flex-col p-3 sm:p-7">
          <h1 className="font-bold text-center text-xl md:text-3xl">iTask - Manage Your Todo List at One Place</h1>
          <div className="AddTodo p-5 px-0 flex gap-4 flex-col ">
            <div className="heading">
              <span className="text-lg md:text-xl font-bold">Add Task</span>
            </div>
            <div className="input gap-3 flex">
              <input
                type="text"
                ref={textRef}
                value={task}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAdd();
                }}
                placeholder="Add your task"
                className="h-9 rounded-md w-4/5 px-2"
              />
              <button
                onClick={handleAdd}
                className="bg-violet-800 text-white overflow-hidden sm:px-4 sm:py-1 md:w-1/6 w-1/3 rounded-md hover:bg-violet-950 max-h-10 max-w-[200px]"
              >
                <label className=" text-[0.8em] md:p-2 sm:text-[0.8em]">
                  {taskid ? "Update Task" : "Add Task"}
                </label>
              </button>
            </div>
          </div>
          <div className="finished flex gap-2 font-semibold text-lg md:text-xl py-3">
          <input type="checkbox" checked = {showFinished} onChange = {()=> {handleFinish()}}  /> 
                Show Finished Tasks
          </div>
          <div className="YourTodo flex gap-4 flex-col">
            <div className="Title">
              <span className="text-lg md:text-xl font-bold">Your Todo</span>
            </div>
            <div className="todoList bg-purple-50 w-11/12 w- rounded-lg">
              {tasks.map((item) => (
                (showFinished || !item.isCompleted) && <div key={item.id} className="todoCard flex gap-4 w-full p-2">
                  <input
                    type="checkbox"
                    checked={item.isCompleted}
                    onChange={() => handleCheckBox(item.id)}
                    name=""
                  />

                  <div className="tasklist flex text-xl gap-1">
                    <div
                      ref={taskRef}
                      className={`task text-[0.8em] md:text-lg ${
                        item.isCompleted ? "line-through" : ""
                      }`}
                    >{` ${item.task}`}</div>
                  </div>
                  <div className="buttons flex gap-3  ml-auto">
                    <button
                      onClick={() => {
                        item.isCompleted ? null : handleEdit(item);
                      }}
                      className="edit bg-violet-800 text-white px-4 py-1 max-h-8 rounded-md hover:bg-violet-950 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                      className="Delete bg-violet-800 text-white px-4 py-1 max-h-8 rounded-md hover:bg-violet-950 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;

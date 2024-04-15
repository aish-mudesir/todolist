import React, { useState, useEffect } from "react";
import "./App.css";
import moment from "moment/moment";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

function App() {
  const [allTodos, setTodos] = useState(JSON.parse(localStorage.getItem("toDoListData")) || []);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newSchedule, setNewSchedule] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    localStorage.setItem("toDoListData", JSON.stringify(allTodos));
  }, [allTodos]);

   console.log(allTodos);

  useEffect(()=>{
     if(allTodos.length>0){
        if(showCompleted){
          let filtereCompleted=allTodos.filter(e=>{
             return e.isCompleted
          })
          setFilteredData(filtereCompleted)
        } else{
            let filteredNotCompleted=allTodos.filter(e=>{
              return !e.isCompleted
          })
          setFilteredData(filteredNotCompleted)
        }     }

},[allTodos,showCompleted])

  const handleAddTodo = () => {
    let truncatedDescription = newDescription;
    let newTodoItem = {
      title: newTitle,
      description: truncatedDescription,
      isCompleted: false,
      completedOn: null,
      createdAt: new Date().getTime(),
      id:new Date().getTime(),
      schedule:newSchedule,
    };

    setTodos((e) => [...e, newTodoItem]);
    setNewTitle("");
    setNewDescription("");
    setNewSchedule("");
  };
// console.log('====================================');
// console.log('filterdData',filteredData);
// console.log('====================================');

return (

  <div className="App">
    <h1> Todo List</h1>
    <div className="todo-wrapper">
      <div className="todo-input ">
        <div className="todo-input-item">
          <label>Title</label>
             <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="what is the task title?"
            />
          </div>

          <div className="todo-input-item">
          <label>Description</label>
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="What is the task description?"
          />
        </div>
        <div className="todo-input-item">
        <label>Scheduled Date</label>
        <input
          type="date"
          value={newSchedule}
          onChange={(e) => setNewSchedule(e.target.value)}
          placeholder="When is your plan to finish the task?"
        />
      </div>

          <div className="todo-input-item">
            <button
              type="button"
              className="primaryBtn"
              onClick={handleAddTodo}
            >
              Add
              
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn ${showCompleted === false && "active"}`}
            onClick={()=>setShowCompleted(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${showCompleted === true && "active"}`}
            onClick={()=>setShowCompleted(true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
          {filteredData.map((item, index) => {
            return <EachToDo item={item} key={index} allTodos={allTodos} setTodos={setTodos} />;
          })}
        </div>
      </div>
    </div>
  );
}

const EachToDo = ({ item, allTodos, setTodos }) => {
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [isEditing, setIsEditing] = useState(false);
  const [schedule, setSchedule] = useState(item.schedule);
  const [showFullDescription, setShowFullDescription] = useState(false); 

  


  const handleEdit=()=>{
    setIsEditing(true);
    setShowFullDescription(true);
  };

  const updateValue = () => {
    setTodos((value) =>
      value.map((e) =>
        e.id === item.id ? { ...e, title: title, description: description } : { ...e }
      )
    );
    setIsEditing(false);
    setShowFullDescription(false); // Add this line to show truncated description after updating
  };
  

  const handleDeleteTodo = () => {
    let filteredTodo = allTodos.filter(e => e.id !== item.id);
    setTodos(filteredTodo);
  };


  const handleComplete = () => {
    
    let updatedTodos = allTodos.map(e =>
      e.id === item.id ? { ...e, isCompleted: !e.isCompleted, completedOn: e.isCompleted ? null : new Date().getTime() } : { ...e }
    );
    setTodos(updatedTodos);
  };


  return (
    <div className="todo-list-item">
      <div>
         {
          isEditing? (
            <>
               <div>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="what is the task title?"
                  />
               </div>

               <div>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="what is the task description?"
                  />
               </div>

               <div>
               <input
                   type="date"
                   value={schedule}
                   onChange={(e) => setSchedule(e.target.value)}
                 />
              </div>
               <div><button onClick={updateValue}>update</button></div>
            </>
           )  :(
            <>

                <h3>{title}</h3>
                <p>{showFullDescription ? item.description : `${item.description.slice(0, 20)}...`}</p>
                <hr />
                <p>
            <small>CreatedAt: {moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</small><br></br>
            <small>Scheduled for: {moment(item.schedule).format("MMMM Do YYYY, h:mm:ss a")}</small><br></br>
            {item.isCompleted && (
              <small>Completed On: {item.completedOn ? moment(item.completedOn).format("MMMM Do YYYY, h:mm:ss a") : ""}</small>
            )}<br></br>
          </p>
          <div>
          <DeleteOutlineIcon
          className="icon" 
          onClick={handleDeleteTodo} 
          title="Delete" 
          />
          
          {item.isCompleted ? (
          <CancelPresentationIcon
            className="check-icon"
            onClick={handleComplete}
            title="Mark as Incomplete"
          />
        ) : (
          <DoneOutlineIcon
            className="check-icon"
            onClick={handleComplete}
            title="Complete?"
          />
        )}
          <EditNoteIcon 
          className="check-icon" 
          onClick={handleEdit} 
          title="Edit?" 
          />
        </div>
      </>
    )}
  </div>
</div>
);
};

export default App;



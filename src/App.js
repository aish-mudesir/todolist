import React, { useState, useEffect } from "react";
import "./App.css";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState( JSON.parse(localStorage.getItem("toDoListData"))||[]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setcurrentEdit] = useState("");
  const [currentEditedItem, setcurrentEditedItem] = useState("");

  useEffect(() => {
    localStorage.setItem("toDoListData", JSON.stringify(allTodos));
  }, [allTodos]);

  console.log(allTodos);

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
      isCompleted: false,
      completedOn: null,
      createdAt: new Date().getTime(),
      id:new Date().getTime(),
    };

    setTodos((e) => [...e, newTodoItem]);
    setNewTitle("");
    setNewDescription("");
  };
const [showCompleted,setShowCompleted]=useState(false)
const [filterdData,setFilteredData]=useState([])

useEffect(()=>{
    if(allTodos.length>0){

        if(showCompleted){
          let filtereCompleted=allTodos.filter(e=>{
             return e.isCompleted
          })
          setFilteredData(filtereCompleted)
        }

        else{
            let filtereCompleted=allTodos.filter(e=>{
              return !e.isCompleted
          })
          setFilteredData(filtereCompleted)
        }

    }

},[allTodos,showCompleted])


console.log('====================================');
console.log('filterdData',filterdData);
console.log('====================================');

  return (
    <div className="App">
      <h1> Todos</h1>
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
              placeholder="what is the task description?"
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
          {filterdData.map((item, index) => {
            return <EachToDo item={item} key={index} allTodos={allTodos} setTodos={setTodos} />;
          })}
        </div>
      </div>
    </div>
  );
}

const EachToDo = ({ item, index,setTodos,allTodos }) => {

  const [title,setTitle]=useState(item.title)
  const [description,setDescription]=useState(item.description)
  const [isEditing,setIsEditing]=useState(false)
  
  useEffect(()=>{
    setTitle(item.title)
    setDescription(item.description)
  },[item])

  const handleEdit=()=>{
    setIsEditing(true)
  }

  const updateValue=()=>{
    setTodos(value=>value.map(e=>{
       return e.id===item.id? {...e,title:title,description:description} : {...e}
    }))
    setIsEditing(false)

  }

  const handleDeleteTodo=()=>{
      let filterToDo=allTodos.filter(e=>{
         return e.id!==item.id
      })

      setTodos(filterToDo)
  }

  const handleComplete=()=>{
    if(!item.isCompleted){
          setTodos(value=>value.map(e=>{
            return e.id===item.id? {...e,isCompleted:true,completedOn:new Date().getTime()} : {...e}
        }))

    }
    else{
      setTodos(value=>value.map(e=>{
        return e.id===item.id? {...e,isCompleted:false,completedOn:null} : {...e}
    }))
    }
  }



  return (
    <div className="todo-list-item">
      <div>
         {
          isEditing?
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
               <div><button onClick={updateValue}>update</button></div>
            </>
            :
            <>

                <h3>{title}</h3>
                <p>{description}</p>
                <p>
                  {item.isCompleted&&<small>Completed on: {item.completedOn}</small>}
                  {<small> on: {item.createdAt}</small>}

                </p>
                <div>
                    <AiOutlineDelete
                      className="icon"
                      onClick={handleDeleteTodo}
                      title="Delete"
                    />
                    <BsCheckLg
                      className="check-icon"
                      onClick={handleComplete}
                      title="Complete?"
                    />
                    <AiOutlineEdit
                      className="check-icon"
                      onClick={handleEdit}
                      title="Edit?"
                    />
                </div>
            </>
         }
        
       
      </div>

     
    </div>
  );
};

export default App;

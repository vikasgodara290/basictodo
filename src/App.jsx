import { Children, useEffect, useRef, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  return (
    <>
      <TodoComponent/>
    </>
  )
}


function TodoComponent() {
  const [res, setRes] = useState([]);
  const inputRef = useRef(null);
  const [currentTodoId, setCurrentTodoId] = useState('');

  async function addTodo(){
    const todoText = inputRef.current.value;
    if (!todoText) return; // Prevent adding empty todos

    try {
      const response = await axios.post('http://localhost:3000/todo', {
        todo: todoText,
        userId: '6760f6c7bc5edacea895d565',
      });

      setRes(response.data);
      inputRef.current.value = '';
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }

  function onEdit(todo) {
    console.log(todo);
    setCurrentTodoId(String(todo._id))
  }

  async function onDelete(e) {
    const response = await axios.delete(`http://localhost:3000/todo?id=${e.target.parentElement.id}`)
    setRes(response.data)
  }

  function handleKeyDown(e){
    if(e.key==='Enter') addTodo();
  }

  useEffect(() => {
    (async () => {
      const url = "http://localhost:3000/todo";
      const response = await axios.get(url);
      setRes(response.data);
    })();
  }, []);
console.log(currentTodoId);

  return (
    <>
      <input ref={inputRef} onKeyDown={handleKeyDown}></input>
      <Button onClick={addTodo} name={'Add'}/>

      {res &&
        res.map((todo) => (
          (String(todo._id)===currentTodoId)? (
            <EditTodo
              key={todo._id}
              todo={todo}
              setRes={setRes}
              setCurrentTodoId={setCurrentTodoId}
            />
          ):
            (<TodoList todo={todo} key={String(todo._id)}>
              <Button onClick={()=>{onEdit(todo)}} name={'Edit'}/>
              <Button onClick={onDelete} name={'Delete'}/>            
            </TodoList>)
        ))
      }
    </>
  );
}

function Button({onClick, name}){
  return(
    <button onClick={onClick}>{name}</button>
  )
}

function TodoList({todo,children}){
  return(
    <div key={String(todo._id)} id={String(todo._id)} style={{ color: "white" }}>
      {todo.todo}
      {children}
    </div>
  )
}

function EditTodo({todo, setRes, setCurrentTodoId}){
  const editRef = useRef(null);
  async function onEditDone(id) {
    console.log(editRef.current.value);
    const response = await axios.put('http://localhost:3000/todo',{
      id:id,
      todo:editRef.current.value
    })
    setCurrentTodoId(null)
    setRes(response.data)
  }
  function onKeyDown(e){
    if(e.key==='Enter'){
      onEditDone(todo._id)
    }
  }

  function onCancel(){
    setCurrentTodoId('')
  }
  
  return(
    <>
      <input ref={editRef} onKeyDown={onKeyDown} defaultValue={todo.todo}></input>
      <Button onClick={()=>{onEditDone(todo._id)}} name={'Done'}/>    
      <Button onClick={onCancel} name={'Cancel'}/> 
    </>
  )
}


export default App

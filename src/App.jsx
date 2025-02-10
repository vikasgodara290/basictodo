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

  function onEdit(e) {
    console.log(e.target.parentElement.id);
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

  return (
    <>
      <input ref={inputRef} onKeyDown={handleKeyDown}></input>
      <Button onClick={addTodo} name={'Add'}/>

      {res &&
        res.map((todo) => (
          <InputTodo todo={todo} key={String(todo._id)}>
            <Button onClick={onEdit} name={'Edit'}/>
            <Button onClick={onDelete} name={'Delete'}/>            
          </InputTodo>
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

function InputTodo({todo,children}){
  return(
    <div key={String(todo._id)} id={String(todo._id)} style={{ color: "white" }}>
      {todo.todo}
      {children}
    </div>
  )
}


export default App

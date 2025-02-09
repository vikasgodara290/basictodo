import { useEffect, useRef, useState } from 'react'
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
  const [inputTodo, setInputTodo] = useState('');
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
      <button onClick={addTodo}>Add</button>

      {res &&
        res.map((todo) => (
          <div key={todo.id} style={{ color: "white" }}>
            {todo.todo}
          </div>
        ))}
    </>
  );
}
export default App

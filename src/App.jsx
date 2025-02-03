import { useEffect, useState } from 'react'
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

  function addTodo(){
    
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
      <input></input>
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

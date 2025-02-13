import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Button from './Button';
import EditTodo from './EditTodo';
import TodoList from './TodoList';

export default function TodoComponent() {
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
      setCurrentTodoId(String(todo._id))
    }
  
    async function onDelete(todo) {
      console.log(todo);
      
      const response = await axios.delete(`http://localhost:3000/todo?id=${String(todo._id)}`)
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
        inputRef.current.focus()
      })();
    }, []);
  console.log(currentTodoId);
  
    return (
      <> 
        <div className='h-24'></div> 
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
              (<TodoList todo={todo} key={String(todo._id)} isChecked={todo.isDone} setRes={setRes} onEdit={()=>onEdit(todo)}>
                <Button onClick={()=>onEdit(todo)} name={'Edit'} todo={todo}/>
                <Button onClick={()=>onDelete(todo)} name={'Delete'} todo={todo}/>            
              </TodoList>)
          ))
        }
        
        <div className='w-full font-mono flex place-content-center items-center'>
          <input ref={inputRef} onKeyDown={handleKeyDown} className='flex-initial w-3/4 ml-52 focus:outline-0' placeholder='add new ...'></input>
          <span className='flex-initial w-1/4 ml-52'></span>
        </div>
      </>
    );
  }


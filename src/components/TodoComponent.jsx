import { useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Button from './Button';
import EditTodo from './EditTodo';
import TodoList from './TodoList';

export default function TodoComponent() {
    const [res, setRes] = useState([]);
    const inputRef = useRef(null);
    const [currentTodoId, setCurrentTodoId] = useState('');
    const navigater = useNavigate()
  
    async function addTodo(){
      const todoText = inputRef.current.value;
      if (!todoText) return; // Prevent adding empty todos
  
      try {
        const response = await axios.post('http://localhost:3000/todo', {
          todo: todoText
        },
        {
          headers:{
            token:localStorage.getItem("token")
          }
        }
      );
  
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
        if(!localStorage.getItem('token')){
          alert('you are not authoried')
          navigater('/login')
          return

        }
        const response = await axios.get(url,{
          headers: {
             token: localStorage.getItem("token")
          }
        });
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
              (<TodoList todo={todo} key={String(todo._id)} isChecked={todo.isDone} setRes={setRes} >
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



import axios from 'axios'
import { useRef } from 'react'
import Button from './Button'
export default function EditTodo({todo, setRes, setCurrentTodoId}){
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
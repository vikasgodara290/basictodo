
import axios from 'axios'
import { useEffect, useRef } from 'react'
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
        <div className='w-full font-mono flex place-content-center items-center'>
          <input autoFocus ref={editRef} onKeyDown={onKeyDown} className='flex-initial w-3/4 ml-52 focus:outline-0' defaultValue={todo.todo}></input>
          <div className="flex-initial w-18 mr-52" id={String(todo._id)}>
            <Button onClick={()=>{onEditDone(todo._id)}} name={'Done'}/>    
            <Button onClick={onCancel} name={'Cancel'}/>  
          </div> 
        </div>

      </>
    )
  }
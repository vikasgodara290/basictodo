import { useRef } from "react"
import axios from 'axios'
export default function TodoList({todo,children, isChecked, setRes}){
    const isCheckedRef = useRef(null)

    async function onInputChange(todo) {
      console.log(isCheckedRef.current.checked);
      const response = await axios.put('http://localhost:3000/todo',{
        id:String(todo._id),
        todo:todo.todo,
        isDone:isCheckedRef.current.checked
      })
      setRes(response.data)
    }


    return(
      <div key={String(todo._id)} id={String(todo._id)} className="w-full font-mono flex place-content-center items-center">
        <div className="flex-initial w-3/4 ml-52">
          <input onChange={()=> onInputChange(todo)} ref={isCheckedRef} checked={isChecked} id={String(todo._id)} type="checkbox" value={todo.todo} className="mr-2 w-4 h-4"/>
          {!isChecked && <label>{todo.todo}</label>}
          {isChecked && <label className="line-through">{todo.todo}</label>}
        </div>
        <div className="flex-initial w-18 mr-52" id={String(todo._id)}>{children}</div>      
      </div>
    )
  }
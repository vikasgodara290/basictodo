export default function TodoList({todo,children}){
    return(
      <div key={String(todo._id)} id={String(todo._id)} style={{ color: "white" }}>
        {todo.todo}
        {children}
      </div>
    )
  }
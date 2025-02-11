import { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  return (
    <>
      <TodoContainer />
    </>
  );
}

function TodoContainer() {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);
  const [currentTodoId, setCurrentTodoId] = useState('');

  async function handleAddTodo() {
    const todoText = inputRef.current.value.trim();
    if (!todoText) return; // Prevent adding empty todos

    try {
      const response = await axios.post('http://localhost:3000/todo', {
        todo: todoText,
        userId: '6760f6c7bc5edacea895d565',
      });

      setTodos(response.data);
      inputRef.current.value = '';
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }

  function handleEditClick(todo) {
    setCurrentTodoId(String(todo._id));
  }

  async function handleDeleteClick(event) {
    const todoId = event.target.parentElement.id;
    try {
      const response = await axios.delete(`http://localhost:3000/todo?id=${todoId}`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }

  function handleInputKeyDown(event) {
    if (event.key === 'Enter') handleAddTodo();
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('http://localhost:3000/todo');
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    })();
  }, []);

  return (
    <>
      <input ref={inputRef} onKeyDown={handleInputKeyDown} />
      <Button onClick={handleAddTodo} label={'Add'} />

      {todos.map((todo) =>
        String(todo._id) === currentTodoId ? (
          <TodoEditor key={todo._id} todo={todo} setTodos={setTodos} setCurrentTodoId={setCurrentTodoId} />
        ) : (
          <TodoItem key={todo._id} todo={todo}>
            <Button onClick={() => handleEditClick(todo)} label={'Edit'} />
            <Button onClick={handleDeleteClick} label={'Delete'} />
          </TodoItem>
        )
      )}
    </>
  );
}

function Button({ onClick, label }) {
  return <button onClick={onClick}>{label}</button>;
}

function TodoItem({ todo, children }) {
  return (
    <div id={String(todo._id)} style={{ color: 'white' }}>
      {todo.todo}
      {children}
    </div>
  );
}

function TodoEditor({ todo, setTodos, setCurrentTodoId }) {
  const editRef = useRef(null);

  async function handleEditSubmit(todoId) {
    const updatedText = editRef.current.value.trim();
    if (!updatedText) return;

    try {
      const response = await axios.put('http://localhost:3000/todo', {
        id: todoId,
        todo: updatedText,
      });
      setTodos(response.data);
      setCurrentTodoId('');
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  }

  function handleEditorKeyDown(event) {
    if (event.key === 'Enter') handleEditSubmit(todo._id);
  }

  function handleCancelEdit() {
    setCurrentTodoId('');
  }

  return (
    <>
      <input ref={editRef} onKeyDown={handleEditorKeyDown} defaultValue={todo.todo} />
      <Button onClick={() => handleEditSubmit(todo._id)} label={'Done'} />
      <Button onClick={handleCancelEdit} label={'Cancel'} />
    </>
  );
}

export default App;
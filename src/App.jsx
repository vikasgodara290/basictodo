import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import TodoComponent from './components/TodoComponent'
import Login from './components/Login'
import Signup from './components/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/todo' element={<TodoComponent/>}/>
        <Route path='/' element={<TodoComponent/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </Router>
  )
}

export default App;
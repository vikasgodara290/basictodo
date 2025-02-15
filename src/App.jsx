import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import TodoComponent from './components/TodoComponent'
import Login from './components/Login'
import Signup from './components/Signup';

const backendUri = 'https://basictodobackend.onrender.com/'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/todo' element={<TodoComponent backendUri={backendUri}/>}/>
        <Route path='/' element={<TodoComponent backendUri={backendUri}/>}/>
        <Route path='/login' element={<Login backendUri={backendUri}/>}/>
        <Route path='/signup' element={<Signup backendUri={backendUri}/>}/>
      </Routes>
    </Router>
  )
}

export default App;
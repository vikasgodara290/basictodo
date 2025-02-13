import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import TodoComponent from './components/TodoComponent'
import Login from './components/Login'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<TodoComponent/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </Router>
  )
}

export default App;
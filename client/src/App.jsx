import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './company/Dashboard'
import Projects from './pages/Projects'
import CreateProject from './pages/CreateProject'
import CompanyDashboard from './pages/CompanyDashboard'
import StudentDashboard from './pages/StudentDashboard'
import Apply from './pages/Apply'

function App() {
  return (
    <Routes>
      <Route path='/' element={ <Home/> } />
      <Route path='/login' element={ <Login/> } />
      <Route path='/register' element={ <Register/> } />
    </Routes>
  )
}

export default App
